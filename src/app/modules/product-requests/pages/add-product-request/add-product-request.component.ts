import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../../shared/models/Product';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import messages from 'src/app/core/messages/error-messages';

@Component({
  selector: 'app-add-product-request',
  templateUrl: './add-product-request.component.html',
  styleUrls: ['./add-product-request.component.scss']
})
export class AddProductRequestComponent implements OnInit {
  @Input() products: Product[] = [];
  formHasError = false;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService,
              private requestorService: RequestorTicketService,
              private router: Router) {
    this.initializeForm();
   }

  ngOnInit(): void {
   this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      products: this.fb.array([this.createProduct()])
  });
}

getProducts() {
  return ( this.form.controls.products as FormArray).controls;
}

  createTicket() {
    this.formHasError = false;
    Object.keys(this.form.controls).forEach((key) => {
    if (this.form.controls[key].errors) {
      this.formHasError = true;
      return;
    }
  });
    if (this.formHasError) {
    this.form.markAllAsTouched();
    return;
  }
    const ticket = this.form.getRawValue();
    this.requestorService.createRequestorTicket(ticket).subscribe((data) => {
      this.toastr.success(data.message, 'Success!');
      this.router.navigate(['/dashboard/product-requests/history']);
      this.form.reset();
    }, error => {
      if (error) {
        this.toastr.error(error.error.message, 'Error!');
      }
    });
  }


getFormError(controlName) {
  if (this.form.controls[controlName].errors) {
      const keys = Object.keys(this.form.controls[controlName].errors);
      return messages[keys[0]];
    }
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
      id: ['', [Validators.required]],
      quantity: [1],
    });
  }
}
