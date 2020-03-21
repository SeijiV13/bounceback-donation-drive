import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDonationHistoryComponent } from './product-donation-history.component';

describe('ProductDonationHistoryComponent', () => {
  let component: ProductDonationHistoryComponent;
  let fixture: ComponentFixture<ProductDonationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDonationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
