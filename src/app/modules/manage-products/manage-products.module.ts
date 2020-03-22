import { AuthService } from './../../core/services/authentication.service';
import { AuthInterceptor } from './../../core/interceptors/http-interceptor.service';
import { ProductService } from './../../core/services/product.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { TabsetNavigationComponent } from './pages/tabset-navigation/tabset-navigation.component';
import { NbDialogModule } from '@nebular/theme';


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
    NbDialogModule.forChild(),
    HttpClientModule,
    ManageProductsRoutingModule
  ], providers: [AuthService, ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
})
export class ManageProductsModule { }
