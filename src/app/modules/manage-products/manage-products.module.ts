import { RouterModule, Routes } from '@angular/router';
import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { TabsetNavigationComponent } from './pages/tabset-navigation/tabset-navigation.component';


const routes: Routes = [
  {
    path: '', component: TabsetNavigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ManageProductsRoutingModule { }



@NgModule({
  declarations: [ProductListComponent, TabsetNavigationComponent, AddProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularModule,
    ManageProductsRoutingModule
  ]
})
export class ManageProductsModule { }
