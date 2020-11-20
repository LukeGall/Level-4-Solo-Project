import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Marble } from 'src/app/Classes/boardParts/marble';

import { DispenserComponent } from './dispenser.component';

describe('DispenserComponent', () => {
  let component: TestDispenser;
  let fixture: ComponentFixture<TestDispenser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserComponent ]
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
    selector: 'app-dispenser',
    template: '<app-dispenser [marbles]="null" [marbleColour]="red">'
  })
  class TestDispenser {
}
});
