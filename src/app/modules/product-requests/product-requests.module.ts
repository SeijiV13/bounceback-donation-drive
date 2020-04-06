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
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AgmCoreModule } from '@agm/core';

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMYg-49MAohiGq7rq0peQI0U07_aY1F8Q',
      libraries: ['places'],
      language: 'en'
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularModule,
    ProductRequestsRoutingModule,
    NgxSmartModalModule.forChild()

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
