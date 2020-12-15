import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinComponent } from './pin.component';

describe('PinComponent', () => {
  let component: TestPin;
  let fixture: ComponentFixture<TestPin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-pin',
    template: '<app-pin [pin]=null [x]="2" [y]="3">'
  })
  class TestPin { }
});
