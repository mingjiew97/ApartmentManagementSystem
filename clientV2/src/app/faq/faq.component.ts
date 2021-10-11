import { Component, OnInit } from '@angular/core';
import {FaqItem} from '@angular-material-extensions/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  list: FaqItem[] = [
    {
      question: 'Am I guaranteed a renewal lease in my unregulated apartment?',
      answer: 'No. Except for rent regulated apartments, a tenant may only renew the lease with the consent of the landlord. See the section on Renewal Leases in the NY State Attorney General\'s Tenant\'s Rights Guide.'
    },
    {
      question: 'I am a rent stabilized tenant - do I have the right to a lease renewal?',
      answer: 'Although there are some exceptions, tenants in rent stabilized apartments have a basic right under state law to select a lease renewal for a one- or two-year term. The landlord must give written notice to the tenant of the right to renewal no more than 150 days and not less than 90 days prior to the end of the lease. '
    },
    {
      question: 'I sometimes pay my rent late - Will this affect my stabilized renewal lease?',
      answer: 'The only way your landlord can deny you a renewal lease is through eviction in Housing Court. Following appropriate notice, a landlord may bring a summary nonpayment court proceeding to evict a tenant who fails to pay the agreed rent when due and to recover outstanding rent.'
    },
    {
      question: 'Am I legally entitled to sublet my rent stabilized apartment?',
      answer: 'You are entitled to request permission to sublet from the owner, and the owner may not unreasonably refuse such permission. However, you must inform the owner by certified mail, return receipt requested, no less than 30 days prior to the proposed subletting.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
