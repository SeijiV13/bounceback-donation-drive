import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRequestComponent } from './pages/add-product-request/add-product-request.component';
import { ProductRequestHistoryComponent } from './pages/product-request-history/product-request-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'add', component: AddProductRequestComponent,
  },
  {
    path: 'history', component: ProductRequestHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})

export class ProductRequestsRoutingModule { }

@NgModule({
  declarations: [AddProductRequestComponent, ProductRequestHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularModule,
    ProductRequestsRoutingModule

  ]
})
export class ProductRequestsModule { }
