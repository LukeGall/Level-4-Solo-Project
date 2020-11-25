import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePuzzlesComponent } from './online-puzzles.component';

describe('OnlinePuzzlesComponent', () => {
  let component: OnlinePuzzlesComponent;
  let fixture: ComponentFixture<OnlinePuzzlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePuzzlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
