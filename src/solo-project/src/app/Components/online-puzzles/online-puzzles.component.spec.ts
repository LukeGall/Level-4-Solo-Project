import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

import { OnlinePuzzlesComponent } from './online-puzzles.component';

describe('OnlinePuzzlesComponent', () => {
  let component: OnlinePuzzlesComponent;
  let fixture: ComponentFixture<OnlinePuzzlesComponent>;
  const stub = { user: of(true) }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinePuzzlesComponent],
      providers: [{ provide: AngularFireAuth, useValue: stub }]
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
