import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerInformationComponent } from './lawyer-information.component';

describe('LawyerInformationComponent', () => {
  let component: LawyerInformationComponent;
  let fixture: ComponentFixture<LawyerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
