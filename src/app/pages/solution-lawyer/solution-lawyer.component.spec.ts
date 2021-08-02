import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionLawyerComponent } from './solution-lawyer.component';

describe('SolutionLawyerComponent', () => {
  let component: SolutionLawyerComponent;
  let fixture: ComponentFixture<SolutionLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
