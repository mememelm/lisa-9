import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateUndersignedComponent } from './mandate-undersigned.component';

describe('MandateUndersignedComponent', () => {
  let component: MandateUndersignedComponent;
  let fixture: ComponentFixture<MandateUndersignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandateUndersignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateUndersignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
