import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenserComponent } from './dispenser.component';

describe('DispenserComponent', () => {
  let component: TestDispenser;
  let fixture: ComponentFixture<TestDispenser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DispenserComponent, TestDispenser]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDispenser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  @Component({
    selector: 'test-dispenser',
    template: `<app-dispenser [marbles]="null" [marbleColour]="'red'">`
  })
  class TestDispenser {
  }
});
