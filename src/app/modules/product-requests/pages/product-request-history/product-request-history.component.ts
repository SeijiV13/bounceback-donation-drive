import { Component, OnInit, Input } from '@angular/core';
import { RequestorTicket } from 'src/app/shared/models/RequestorTicket';

@Component({
  selector: 'app-product-request-history',
  templateUrl: './product-request-history.component.html',
  styleUrls: ['./product-request-history.component.scss']
})
export class ProductRequestHistoryComponent implements OnInit {
  @Input() requestorTickets: RequestorTicket[] = [
    {
      id: '1',
      name: 'Seiji Villafranca',
      address: 'Pasig City',
      contactPerson: 'Seiji VIllafranca',
      contactNumber: '09127123123',
      products: [{
        name: 'Alcohol',
        quantity: 4
      },
      {
        name: 'Tissue',
        quantity: 4
      }]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
