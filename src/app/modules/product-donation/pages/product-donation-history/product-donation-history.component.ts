import { ToastrService } from 'ngx-toastr';
import { Product } from './../../../../shared/models/Product';
import { ProductService } from './../../../../core/services/product.service';
import { DonorTicket } from './../../../../shared/models/DonorTicket';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DonorTicketService } from 'src/app/core/services/donor-ticket.service';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

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
  constructor(private donorService: DonorTicketService,
              private productService: ProductService,
              public ngxSmartModalService: NgxSmartModalService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTickets();
    this.getProducts();
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

}
