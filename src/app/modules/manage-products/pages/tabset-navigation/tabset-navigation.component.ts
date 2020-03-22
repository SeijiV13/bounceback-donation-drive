import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabset-navigation',
  templateUrl: './tabset-navigation.component.html',
  styleUrls: ['./tabset-navigation.component.scss']
})
export class TabsetNavigationComponent implements OnInit {
  @ViewChild('productList') productList: ProductListComponent;
  constructor() { }

  ngOnInit(): void {
  }

  getProducts() {
    console.log("test");
    this.productList.getProducts();
  }

}
