import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputsLibComponent } from './ng-inputs-lib.component';

describe('NgInputsLibComponent', () => {
  let component: NgInputsLibComponent;
  let fixture: ComponentFixture<NgInputsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgInputsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
