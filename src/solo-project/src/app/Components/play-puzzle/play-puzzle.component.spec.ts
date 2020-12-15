import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPuzzleComponent } from './play-puzzle.component';

describe('PlayPuzzleComponent', () => {
  let component: TestPlayPuzzle;
  let fixture: ComponentFixture<TestPlayPuzzle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayPuzzleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlayPuzzle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-play-puzzle`,
    template: `<app-play-puzzle [puzzle]="null">`
  })
  class TestPlayPuzzle { }
});
