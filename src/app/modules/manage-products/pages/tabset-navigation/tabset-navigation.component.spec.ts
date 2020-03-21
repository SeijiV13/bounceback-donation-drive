import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsetNavigationComponent } from './tabset-navigation.component';

describe('TabsetNavigationComponent', () => {
  let component: TabsetNavigationComponent;
  let fixture: ComponentFixture<TabsetNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsetNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsetNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
