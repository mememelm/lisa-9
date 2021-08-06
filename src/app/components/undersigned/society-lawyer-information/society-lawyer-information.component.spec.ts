import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyLawyerInformationComponent } from './society-lawyer-information.component';

describe('SocietyLawyerInformationComponent', () => {
  let component: SocietyLawyerInformationComponent;
  let fixture: ComponentFixture<SocietyLawyerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyLawyerInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyLawyerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
