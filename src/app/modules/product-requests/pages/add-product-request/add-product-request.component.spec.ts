import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductRequestComponent } from './add-product-request.component';

describe('AddProductRequestComponent', () => {
  let component: AddProductRequestComponent;
  let fixture: ComponentFixture<AddProductRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
