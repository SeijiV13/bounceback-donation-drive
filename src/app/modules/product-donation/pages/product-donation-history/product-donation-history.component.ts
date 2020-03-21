import { DonorTicket } from './../../../../shared/models/DonorTicket';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-donation-history',
  templateUrl: './product-donation-history.component.html',
  styleUrls: ['./product-donation-history.component.scss']
})
export class ProductDonationHistoryComponent implements OnInit {
  @Input() donorTickets: DonorTicket[] = [
    {
      id: '1',
      name: 'Company A',
      contactPerson: 'Seiji Villafranca',
      contactNumber: '09171368007',
      products: [{
        name: 'Alcohol',
        quantity: 4
      },
      {
        name: 'Tissue',
        quantity: 4
      }]
    },
    {
      id: '2',
      name: 'Company B',
      contactPerson: 'Jane Doe',
      contactNumber: '09171368007',
      products: [{
        name: 'Tissue',
        quantity: 4
      }]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
