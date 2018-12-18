import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitQuantityCodeComponent } from './unit-quantity-code.component';

describe('UnitQuantityCodeComponent', () => {
  let component: UnitQuantityCodeComponent;
  let fixture: ComponentFixture<UnitQuantityCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitQuantityCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitQuantityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
