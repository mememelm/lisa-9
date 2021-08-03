import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAdviceComponent } from './private-advice.component';

describe('PrivateAdviceComponent', () => {
  let component: PrivateAdviceComponent;
  let fixture: ComponentFixture<PrivateAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
