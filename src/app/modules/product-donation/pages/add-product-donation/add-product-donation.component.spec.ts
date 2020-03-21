import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDonationComponent } from './add-product-donation.component';

describe('AddProductDonationComponent', () => {
  let component: AddProductDonationComponent;
  let fixture: ComponentFixture<AddProductDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
