import { Product } from './../../../../shared/models/Product';
import { ProductService } from './../../../../core/services/product.service';
import { DonorTicket } from './../../../../shared/models/DonorTicket';
import { Component, OnInit, Input } from '@angular/core';
import { DonorTicketService } from 'src/app/core/services/donor-ticket.service';

@Component({
  selector: 'app-product-donation-history',
  templateUrl: './product-donation-history.component.html',
  styleUrls: ['./product-donation-history.component.scss']
})
export class ProductDonationHistoryComponent implements OnInit {
  @Input() donorTickets: DonorTicket[] = [];
  products: Product[] = [];
  constructor(private donorService: DonorTicketService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.getTickets();
    this.getProducts();
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

}
