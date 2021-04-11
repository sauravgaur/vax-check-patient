import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Wizard2Component } from './wizard2.component';

describe('Wizard2Component', () => {
  let component: Wizard2Component;
  let fixture: ComponentFixture<Wizard2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Wizard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wizard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
