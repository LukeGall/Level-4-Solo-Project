import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotComponent } from './slot.component';

describe('SlotComponent', () => {
  let component: TestSlot;
  let fixture: ComponentFixture<TestSlot>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-slot',
    template: `<app-slot [slot]="null" [x]="5" [y]="6">`
  })
  class TestSlot{}
});
