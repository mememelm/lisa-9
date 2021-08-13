import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetractionComponent } from './retraction.component';

describe('RetractionComponent', () => {
  let component: RetractionComponent;
  let fixture: ComponentFixture<RetractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
