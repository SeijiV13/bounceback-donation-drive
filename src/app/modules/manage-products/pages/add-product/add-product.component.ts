import { Component, OnInit, HostBinding } from '@angular/core';
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
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private toastrService: NbToastrService,
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
    console.log(this.form.getRawValue());
    this.toastrService.show('success', `Added the ${name} product successsfully`, { status: 'success' });
  }

  clear() {
    this.form.reset();
  }

}
