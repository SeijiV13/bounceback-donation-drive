import { Product } from './../../../../shared/models/Product';
import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { RequestorTicket } from 'src/app/shared/models/RequestorTicket';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';

@Component({
  selector: 'app-product-request-history',
  templateUrl: './product-request-history.component.html',
  styleUrls: ['./product-request-history.component.scss']
})
export class ProductRequestHistoryComponent implements OnInit {
  @Input() requestorTickets: RequestorTicket[] = [];
  products: Product[] = [];
  constructor(private requestorService: RequestorTicketService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getTickets();
    this.getProducts();
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

}


