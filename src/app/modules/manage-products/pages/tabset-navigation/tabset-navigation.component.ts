import { AuthService } from './../../../../core/services/authentication.service';
import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabset-navigation',
  templateUrl: './tabset-navigation.component.html',
  styleUrls: ['./tabset-navigation.component.scss']
})
export class TabsetNavigationComponent implements OnInit {
  @ViewChild('productList') productList: ProductListComponent;
  admin = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.testJwt();
  }

  getProducts() {
    this.productList.getProducts();
  }

  testJwt() {
    this.authService.testJwt().subscribe((data) => {
      this.admin = true;
    }, (error) => {
      this.admin = false;
   })
}


}
