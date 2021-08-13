import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenumerationAssistanceComponent } from './renumeration-assistance.component';

describe('RenumerationAssistanceComponent', () => {
  let component: RenumerationAssistanceComponent;
  let fixture: ComponentFixture<RenumerationAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenumerationAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenumerationAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
