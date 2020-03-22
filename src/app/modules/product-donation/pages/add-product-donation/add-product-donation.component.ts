import { ProductService } from './../../../../core/services/product.service';
import { DonorTicketService } from './../../../../core/services/donor-ticket.service';
import { Product } from './../../../../shared/models/Product';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-donation',
  templateUrl: './add-product-donation.component.html',
  styleUrls: ['./add-product-donation.component.scss']
})
export class AddProductDonationComponent implements OnInit {
  @Input() products: Product[] = [];
  formHasError = false;
  form: FormGroup;
  constructor(private fb: FormBuilder, private donorService: DonorTicketService,
              private router: Router,
              private toastr: ToastrService,
              private productService: ProductService) {
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
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      products: this.fb.array([this.createProduct()])
  });
}



createTicket() {
  if (this.form.hasError) {
    this.formHasError = true;
    return;
  }
  const ticket = this.form.getRawValue();
  this.donorService.createDonorTicket(ticket).subscribe((data) => {
    this.toastr.success(data.message, 'Success!');
    this.router.navigate(['/dashboard/product-donation/history']);
    this.form.reset();
  }, error => {
    if (error) {
      this.toastr.error(error.error.message, 'Error!');
    }
  });
}

getProducts() {
  return ( this.form.controls.products as FormArray).controls;
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
