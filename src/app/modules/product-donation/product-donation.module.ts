import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductDonationComponent } from './pages/add-product-donation/add-product-donation.component';
import { ProductDonationHistoryComponent } from './pages/product-donation-history/product-donation-history.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'add', component: AddProductDonationComponent,
  },
  {
    path: 'history', component: ProductDonationHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ProductDonationRoutingModule { }



@NgModule({
  declarations: [AddProductDonationComponent, ProductDonationHistoryComponent],
  imports: [
    CommonModule,
    NebularModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDonationRoutingModule
  ]
})
export class ProductDonationModule { }
