import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-pay-rent',
  templateUrl: './pay-rent.component.html',
  styleUrls: ['./pay-rent.component.scss']
})
export class PayRentComponent implements OnInit {

  submitted = false;
  formProcess = 0;
  customStripeForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private as: AuthService,
  ) { }

  ngOnInit() {
    // this.loadStripe();
    this.customStripeForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  showComplete() {
    setTimeout(function() {
      alert('Thank you for your payment');
    }, 2000);
  }

  // loadStripe() {
  //
  //   if (!window.document.getElementById('stripe-custom-form-script')) {
  //     const s = window.document.createElement('script');
  //     s.id = 'stripe-custom-form-script';
  //     s.type = 'text/javascript';
  //     s.src = 'https://js.stripe.com/v2/';
  //     s.onload = () => {
  //       window['Stripe'].setPublishableKey('pk_test_aeUUjYYcx4XNfKVW60pmHTtI');
  //     };
  //     window.document.body.appendChild(s);
  //   }
  // }

  pay() {

    this.submitted = true;

    if (this.customStripeForm.invalid) {
      return;
    }
    this.formProcess = 1;

    this.showComplete();

    // (window as any).Stripe.card.createToken({
    //   number: form.cardNumber,
    //   exp_month: form.expMonth,
    //   exp_year: form.expYear,
    //   cvc: form.cvc
    // }, (status: number, response: any) => {
    //   this.submitted = false;
    //   this.formProcess = 2;
    //   if (status === 200) {
    //     this.message = `Success! Card token ${response.card.id}.`;
    //     console.log('*************');
    //     console.log(this.message);
    //     alert('Thank you for your payment');
    //   } else {
    //     this.message = response.error.message;
    //   }
    // });
    // this.router.navigate(['/home']);
  }
}
