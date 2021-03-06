import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {RoomService} from '../../../services/room.service';
import {AuthService} from '../../../services/auth.service';
import {Room} from '../../../modules/Room';
import {Card} from '../../../modules/Card';
import {CardService} from '../../../services/card.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'stripe-demo',
  templateUrl: './stripe-demo.component.html',
  styleUrls: ['./stripe-demo.component.css']
})
export class StripeDemoComponent implements OnInit, AfterViewInit {

  constructor(
    private rs: RoomService,
    private as: AuthService,
    private cs: CardService,
    private formBuilder: FormBuilder,
  ) { }
  @ViewChild('stripeContainer', {static: true}) stripeContainer: ElementRef;

  api_key = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'; // replace me

  card: any;
  stripe: any;
  token: string;
  elements: any;
  form: any;
  resetButton: any;
  errorvisible = false;
  error_message = '';
  paymentRequestAvailable = false;
  checked = false;
  defaultCard: Card;
  cardForm;
  userValue;
  rentBalance;
  actualPayment = 0;

  ngOnInit() {
    if (localStorage.getItem('PayAmount') !== null) {
      this.actualPayment = parseInt(localStorage.getItem('PayAmount'), 10);
    }
    this.as.userSubject.subscribe((u) => {
      if (u !== null) {
        this.userValue = u;
        this.rs.getRoomByRoomNumber(u.roomNumber).subscribe((r) => {
          if (r !== null) {
            this.rentBalance = r.remainedBalance;
            if (this.actualPayment === 0) {
              this.actualPayment = this.rentBalance;
            }
          }
        });
      }
    });
  }

  ngAfterViewInit() {

    this.form = this.stripeContainer.nativeElement.querySelector('form');
    // console.log(this.form);
    this.resetButton = this.stripeContainer.nativeElement.querySelector('a.reset');
    // console.log(this.resetButton);
    // this.error = this.form.querySelector('.error');
    // console.log(this.error);
    // this.errorMessage = this.error.querySelector('.message');
    // console.log(this.errorMessage);

    this.stripe = Stripe(this.api_key); // use your test publishable key

    this.elements = this.stripe.elements({
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: 'en'
    });

    /**
     * Card Element
     */
    this.card = this.elements.create('card', {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#fff',
          color: '#fff',
          fontWeight: 400,
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: '15px',
          fontSmoothing: 'antialiased',

          '::placeholder': {
            color: '#BFAEF6'
          },
          ':-webkit-autofill': {
            color: '#fce883'
          }
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE'
        }
      }
    });
    this.card.mount('#example5-card');

    const paymentRequest = this.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: 2500,
        label: 'Total'
      },
      requestShipping: true,
      shippingOptions: [
        {
          id: 'free-shipping',
          label: 'Free shipping',
          detail: 'Arrives in 5 to 7 days',
          amount: 0
        }
      ]
    });

    paymentRequest.on('token', (result) => {
      // console.log("paymentRequest.on(\"token\")");
      this.token = result.token.id;
      this.stripeContainer.nativeElement.classList.add('submitted');
      result.complete('success');
    });

    const paymentRequestElement = this.elements.create('paymentRequestButton', {
      paymentRequest,
      style: {
        paymentRequestButton: {
          theme: 'light'
        }
      }
    });

    // canMakePayment returns true if your browser has saved your payment information
    // (think: google wallet or apple pay)
    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        this.paymentRequestAvailable = true;
        paymentRequestElement.mount('#example5-paymentRequest');
        /*
        document.querySelector(".example5 .card-only").style.display = "none";
        document.querySelector(".example5 .payment-request-available").style.display = "block";
        */
      }
    });

    this.card.on('change', (event) => {
      this.cardOnChange(event);
    });

    this.form.addEventListener('submit', (e) =>  {
      e.preventDefault(); // this needs to be here, not in onSubmit for some reason.
      this.onSubmit(e);
    });

  } // END ngAfterViewInit //

  cardOnChange(event) {
    const savedErrors = {};
    // console.log("card.on change()");
    if (event.error) {
      // o error.classList.add('visible');
      this.errorvisible = true;
      savedErrors[0] = event.error.message;
      // o errorMessage.innerText = event.error.message;
      this.error_message = event.error.message;
      // console.log("displaying", this.error_message);
    } else {
      savedErrors[0] = null;

      // Loop over the saved errors and find the first one, if any.
      const nextError = Object.keys(savedErrors)
        .sort()
        .reduce((maybeFoundError, key) => {
          return maybeFoundError || savedErrors[key];
        }, null);

      if (nextError) {
        // Now that they've fixed the current error, show another one.
        // o errorMessage.innerText = nextError;
        // console.log("displaying", nextError);
        this.error_message = nextError;
      } else {
        // The user fixed the last error; no more errors.
        // o error.classList.remove('visible');
        this.errorvisible = false;
      }
    }
  }

  onSubmit(e) {
    // console.log("onSubmit(e)", e);
    e.preventDefault();

    // o example.classList.add('submitting');
    this.stripeContainer.nativeElement.classList.add('submitting');

    this.disableInputs();

    const name     = this.form.querySelector('#example5-name');
    const address1 = this.form.querySelector('#example5-address');
    const city     = this.form.querySelector('#example5-city');
    const state    = this.form.querySelector('#example5-state');
    const zip      = this.form.querySelector('#example5-zip');

    const additionalData = {
      name: name ? name.value : undefined,
      address_line1: address1 ? address1.value : undefined,
      address_city: city ? city.value : undefined,
      address_state: state ? state.value : undefined,
      address_zip: zip ? zip.value : undefined,
    };

    this.as.userSubject.subscribe((user) => {
      if (user !== null) {
        this.rs.changeRoomBalance({
          roomNumber: user.roomNumber,
          remainedBalance: (this.rentBalance - this.actualPayment)
        } as Room).subscribe((res) => {
          if (!res.success) {
            alert('payment failed!');
          }
        });

        if (this.checked) {
          this.cs.saveCard({
            cardNumber: 4242424242424242,
            expDate: 4,
            expMonth: 20,
            username: user.username,
            address: '5 Independence Way',
            city: 'Princeton',
            state: 'NJ',
            zipCode: 12183,
            name: 'mingjie',
            country: 'USA'
          } as Card).subscribe((res) => {
            alert('Card saved!');
            // if (res.success) {
            //   alert('Card saved!');
            // } else {
            //   alert('Can not save card');
            // }
          });
        }
      }
    });

    this.stripe.createToken(this.card, additionalData).then((result) => {
      this.stripeContainer.nativeElement.classList.remove('submitting');

      if (result.token) {
        // If we received a token, show the token ID.
        // o example.querySelector('.token').innerText = result.token.id;
        this.token = result.token.id;
        this.stripeContainer.nativeElement.classList.add('submitted');
      } else {
        // Otherwise, un-disable inputs.
        this.enableInputs();
      }
    });
  }

  onReset(e) {
    // console.log("onReset(e)", e);

    e.preventDefault();

    // // Resetting the form (instead of setting the value to `''` for each input)
    // // helps us clear webkit autofill styles.
    this.form.reset();
    // console.log("this.elements", this.elements);

    // Clear each Element.
    this.card.clear();

    // // Reset error state as well.
    // error.classList.remove('visible');
    this.errorvisible = false;

    // // Resetting the form does not un-disable inputs, so we need to do it separately:
    this.enableInputs();
    this.stripeContainer.nativeElement.classList.remove('submitted');
  }

  enableInputs() {
    Array.prototype.forEach.call(
      this.form.querySelectorAll(
        'input[type=\'text\'], input[type=\'email\'], input[type=\'tel\']'
      ),
      (input) => {
        input.removeAttribute('disabled');
      }
    );
  }

  disableInputs() {
    Array.prototype.forEach.call(
      this.form.querySelectorAll(
        'input[type=\'text\'], input[type=\'email\'], input[type=\'tel\']'
      ),
      (input) => {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  changeChecked() {
    this.checked = !this.checked;
    console.log(this.checked);
  }

  getBackGroundImage() {
    // tslint:disable-next-line:max-line-length
    // return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/paymentBackGround.jpg\')';
    // return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/payment2.jpg\')';
    return 'url(\'https://msi-final-mingjie-resources.s3.us-east-2.amazonaws.com/background0.jpg\')';
  }

}
