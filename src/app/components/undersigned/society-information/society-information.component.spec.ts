import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyInformationComponent } from './society-information.component';

describe('SocietyInformationComponent', () => {
  let component: SocietyInformationComponent;
  let fixture: ComponentFixture<SocietyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
