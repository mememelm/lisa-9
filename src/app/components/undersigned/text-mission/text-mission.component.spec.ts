import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMissionComponent } from './text-mission.component';

describe('TextMissionComponent', () => {
  let component: TextMissionComponent;
  let fixture: ComponentFixture<TextMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
