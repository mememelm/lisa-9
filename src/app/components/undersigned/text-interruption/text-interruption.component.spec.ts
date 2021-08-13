import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInterruptionComponent } from './text-interruption.component';

describe('TextInterruptionComponent', () => {
  let component: TextInterruptionComponent;
  let fixture: ComponentFixture<TextInterruptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInterruptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInterruptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
