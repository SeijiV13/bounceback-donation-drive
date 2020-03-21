import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestHistoryComponent } from './product-request-history.component';

describe('ProductRequestHistoryComponent', () => {
  let component: ProductRequestHistoryComponent;
  let fixture: ComponentFixture<ProductRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
