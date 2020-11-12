import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonGbPieceComponent } from './non-gb-piece.component';

describe('NonGbPieceComponent', () => {
  let component: NonGbPieceComponent;
  let fixture: ComponentFixture<NonGbPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonGbPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonGbPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
