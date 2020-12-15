import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipperComponent } from './flipper.component';

describe('FlipperComponent', () => {
  let component: TestFlipper;
  let fixture: ComponentFixture<TestFlipper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlipperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlipper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  @Component({
    selector: 'app-flipper',
    template: `<app-flipper [colour]="'blue'">`
  })
  class TestFlipper {
  }
});
