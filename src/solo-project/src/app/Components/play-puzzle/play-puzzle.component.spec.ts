import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPuzzleComponent } from './play-puzzle.component';

describe('PlayPuzzleComponent', () => {
  let component: PlayPuzzleComponent;
  let fixture: ComponentFixture<PlayPuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayPuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
