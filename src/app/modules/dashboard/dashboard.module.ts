import { MenuComponent } from './../../shared/components/menu/menu.component';
import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'manage-products', loadChildren: () => import('../manage-products/manage-products.module').then(m => m.ManageProductsModule)
      },
      {
        path: 'product-donation', loadChildren: () =>
         import('../product-donation/product-donation.module').then(m => m.ProductDonationModule)
      },
      {
        path: 'product-requests', loadChildren: () =>
         import('../product-requests/product-requests.module').then(m => m.ProductRequestsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }



@NgModule({
  declarations: [    DashboardComponent, MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NebularModule
  ]
})
export class DashboardModule { }
