import { ProductService } from './../../../../core/services/product.service';
import { DonorTicketService } from './../../../../core/services/donor-ticket.service';
import { Product } from './../../../../shared/models/Product';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import messages from 'src/app/core/messages/error-messages';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-product-donation',
  templateUrl: './add-product-donation.component.html',
  styleUrls: ['./add-product-donation.component.scss']
})
export class AddProductDonationComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];
  formHasError = false;
  form: FormGroup;
  latitude: any;
  longitude: any;
  zoom: any;
  geoCoder: any;
  address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private fb: FormBuilder, private donorService: DonorTicketService,
              private router: Router,
              private toastr: ToastrService,
              private productService: ProductService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.initializeForm();
   }

   ngOnInit(): void {
    this.getAllProducts();
   }
   ngAfterViewInit() {
    this.autoComplete();
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
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

getFormError(controlName) {
  if (this.form.controls[controlName].errors) {
      const keys = Object.keys(this.form.controls[controlName].errors);
      return messages[keys[0]];
    }
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

  autoComplete() {
    this.mapsAPILoader.load().then(() => {
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      this.setCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.form.controls.address.patchValue(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
