import { AuthService } from './../../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Product } from './../../../../shared/models/Product';
import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RequestorTicket } from 'src/app/shared/models/RequestorTicket';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-product-request-history',
  templateUrl: './product-request-history.component.html',
  styleUrls: ['./product-request-history.component.scss']
})
export class ProductRequestHistoryComponent implements OnInit {
  @Input() requestorTickets: RequestorTicket[] = [];
  @ViewChild('approveModal') approveModal: NgxSmartModalComponent;
  products: Product[] = [];
  ticketId = '';
  admin = false;
  constructor(private requestorService: RequestorTicketService, 
              private productService: ProductService, 
              public ngxSmartModalService: NgxSmartModalService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getTickets();
    this.getProducts();
    this.testJwt();
  }

  selectId(id) {
    this.ticketId = id;
  }

  getTickets() {
    this.requestorService.getAllRequestorTicket().subscribe((data) => {
      this.requestorTickets = data;
   });
   }
  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getProductName(id) {
    if (this.products.find((data) => data.id === id)) {
      return this.products.find((data) => data.id === id).name;
    }
    return '';
  }

  approveTicket(id) {
    this.requestorService.approveDonorTicket(id).subscribe((data) => {
      this.approveModal.close();
      this.getTickets();
      this.toastr.success(data.message, 'Success!');
    });
  }

  add() {
    this.router.navigate(['/dashboard/product-requests/add']);
 }

 testJwt() {
   this.authService.testJwt().subscribe(() => {
     this.admin = true;
   }, () => {
     this.admin = false;
   })
 }

}


