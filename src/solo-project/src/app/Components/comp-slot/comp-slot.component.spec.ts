import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSlotComponent } from './comp-slot.component';

describe('CompSlotComponent', () => {
  let component: TestCompSlot;
  let fixture: ComponentFixture<TestCompSlot>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompSlotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-comp-slot`,
    template: `<app-comp-slot [compSlot]="null" [x]="5" [y]="6">`
  })
  class TestCompSlot { }
});
