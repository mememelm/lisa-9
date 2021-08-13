import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenumerationTransactionComponent } from './renumeration-transaction.component';

describe('RenumerationTransactionComponent', () => {
  let component: RenumerationTransactionComponent;
  let fixture: ComponentFixture<RenumerationTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenumerationTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenumerationTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
