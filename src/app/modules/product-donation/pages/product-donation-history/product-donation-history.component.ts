import { AuthService } from './../../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../../../shared/models/Product';
import { ProductService } from './../../../../core/services/product.service';
import { DonorTicket } from './../../../../shared/models/DonorTicket';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DonorTicketService } from 'src/app/core/services/donor-ticket.service';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-donation-history',
  templateUrl: './product-donation-history.component.html',
  styleUrls: ['./product-donation-history.component.scss']
})
export class ProductDonationHistoryComponent implements OnInit {
  @Input() donorTickets: DonorTicket[] = [];
  @ViewChild('approveModal') approveModal: NgxSmartModalComponent;
  products: Product[] = [];
  ticketId = '';
  admin = false;
  constructor(private donorService: DonorTicketService,
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
    this.donorService.getAllDonorTicket().subscribe((data) => {
      this.donorTickets = data;
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
    this.donorService.approveDonorTicket(id).subscribe((data) => {
      this.approveModal.close();
      this.getTickets();
      this.toastr.success(data.message, 'Success!');
    });
  }
  add() {
     this.router.navigate(['/dashboard/product-donation/add']);
  }

 testJwt() {
  this.authService.testJwt().subscribe(() => {
    this.admin = true;
  }, () => {
    this.admin = false;
  })
}

}
