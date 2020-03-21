import { Product } from './../../../../shared/models/Product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [
    {
     id: '1',
     name: 'Alcohol',
     description: 'lorem ipsum',
     quantity: 0,
     comments: 'lorem ipsusm'
    },
    {
    id: '2',
    name: 'Tissue',
    description: 'lorem ipsum',
    quantity: 100,
    comments: 'lorem ipsusm'
   }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
