import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

import { OnlinePuzzlesComponent } from './online-puzzles.component';

describe('OnlinePuzzlesComponent', () => {
  let component: OnlinePuzzlesComponent;
  let fixture: ComponentFixture<OnlinePuzzlesComponent>;
  const stub = {
    getPuzzles: () => {return of([])},
    collection: (name: string) => {
      doc: (_id: string) => ({
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnlinePuzzlesComponent],
      providers: [{provide: MakePuzzleService,useValue: stub},{ provide: AngularFireDatabase, useValue: stub }, { provide: AngularFireAuth, useValue: stub }]
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
