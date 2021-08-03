import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateDocumentationComponent } from './private-documentation.component';

describe('PrivateDocumentationComponent', () => {
  let component: PrivateDocumentationComponent;
  let fixture: ComponentFixture<PrivateDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
