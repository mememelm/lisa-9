import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFinancialComponent } from './building-financial.component';

describe('BuildingFinancialComponent', () => {
  let component: BuildingFinancialComponent;
  let fixture: ComponentFixture<BuildingFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
