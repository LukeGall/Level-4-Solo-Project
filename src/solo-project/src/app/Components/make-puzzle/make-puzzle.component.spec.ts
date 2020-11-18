import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePuzzleComponent } from './make-puzzle.component';

describe('MakePuzzleComponent', () => {
  let component: MakePuzzleComponent;
  let fixture: ComponentFixture<MakePuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
