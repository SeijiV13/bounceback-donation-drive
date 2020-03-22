import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @HostBinding('class')
  classes = 'card-container';
  @Output() createProductEmitter = new EventEmitter();
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private toastrService: NbToastrService,
              private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      quantity: [1],
      comments: ['']
    });
  }

  createProduct() {
    const product = this.form.getRawValue();
    this.productService.createProduct(product).subscribe((data) => {
      this.createProductEmitter.emit();
    }, error => {

    });
  }

  clear() {
    this.form.reset();
  }

}
