import { ProductService } from './../../core/services/product.service';
import { AuthInterceptor } from './../../core/interceptors/http-interceptor.service';
import { AuthService } from './../../core/services/authentication.service';
import { NebularModule } from './../../shared/modules/nebular/nebular.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRequestComponent } from './pages/add-product-request/add-product-request.component';
import { ProductRequestHistoryComponent } from './pages/product-request-history/product-request-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


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

  ],
  exports: [ProductRequestHistoryComponent],
  providers: [AuthService, RequestorTicketService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  ProductService
]
})
export class ProductRequestsModule { }
