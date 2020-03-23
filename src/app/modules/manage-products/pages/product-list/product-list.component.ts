import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../../shared/models/Product';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @ViewChild('deleteModal') deleteModal: NgxSmartModalComponent;
  selectedId = '';
  constructor(private productService: ProductService,
              private toastr: ToastrService,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
   this.getProducts();
  }

  selectId(id) {
   this.selectedId = id;
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.deleteModal.close();
      this.toastr.success('Successfully deleted the product', 'Success!');
      this.getProducts();
    });
  }
}
