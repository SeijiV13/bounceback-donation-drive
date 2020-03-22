import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../../shared/models/Product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.getProducts();
    });
  }
}
