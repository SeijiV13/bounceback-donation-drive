import { Product } from './../../../../shared/models/Product';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-product-request',
  templateUrl: './add-product-request.component.html',
  styleUrls: ['./add-product-request.component.scss']
})
export class AddProductRequestComponent implements OnInit {
  @Input() products: Product[] = [];
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.initializeForm();
   }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.fb.group({
      name: [''],
      address: [''],
      contactPerson: [''],
      contactNumber: [''],
      products: this.fb.array([this.createProduct()])
  });
}

getProducts() {
  return ( this.form.controls.products as FormArray).controls;
}

  createTicket() {
    console.log(this.form.getRawValue());
  }

  clear() {
    this.form.reset();
  }

  addProduct() {
    (this.form.controls.products as FormArray).push(this.createProduct());
 }

 removeProduct(i) {
    (this.form.controls.products as FormArray).removeAt(i);
 }

  createProduct() {
    return this.fb.group({
      name: [''],
      quantity: [1],
    });
  }
}
