import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDotsComponent } from './action-dots.component';

describe('ActionDotsComponent', () => {
  let component: ActionDotsComponent;
  let fixture: ComponentFixture<ActionDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
