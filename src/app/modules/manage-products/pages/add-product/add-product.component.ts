import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, HostBinding, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @HostBinding('class')
  classes = 'card-container';
  @Output() createProductEmitter = new EventEmitter();
  @ViewChild('dialog') dialog;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService
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
      this.toastr.success(data.message, 'Success!');
      this.form.reset();
      this.createProductEmitter.emit();
    }, error => {
      if (error) {
        this.toastr.success(error.error.message, 'Error!');
      }
    });
  }


  clear() {
    this.form.reset();
  }

}
