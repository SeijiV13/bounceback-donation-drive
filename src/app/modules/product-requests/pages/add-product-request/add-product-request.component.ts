import { ProductService } from './../../../../core/services/product.service';
import { Product } from './../../../../shared/models/Product';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { RequestorTicketService } from 'src/app/core/services/requestor-ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import messages from 'src/app/core/messages/error-messages';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-add-product-request',
  templateUrl: './add-product-request.component.html',
  styleUrls: ['./add-product-request.component.scss']
})
export class AddProductRequestComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];
  @ViewChild('map', {static: false}) mapElement: any;
  map: google.maps.Map;
  latitude: any;
  longitude: any;
  zoom: any;
  formHasError = false;
  form: FormGroup;
  geoCoder: any;
  address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService,
              private requestorService: RequestorTicketService,
              private router: Router,
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
