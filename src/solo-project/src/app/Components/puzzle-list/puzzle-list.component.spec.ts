import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

import { PuzzleListComponent } from './puzzle-list.component';

describe('DefaultPuzzlesComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;
  const stub = {
    getPuzzles: () => { return of([]) },
    collection: (name: string) => {
      doc: (_id: string) => ({
        set: (_d: any) => new Promise((resolve, _reject) => resolve(void)),
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleListComponent],
      providers: [{ provide: MakePuzzleService, useValue: stub }, { provide: AngularFireAuth, useValue: stub }, { provide: AngularFireDatabase, useValue: stub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set puzzle correctly', () => {
    component.pageSize = 5;
    component.curIndex = 2;
    component.setPuzzleTo(1);
    expect(component.puzzleId).toEqual(11);
  })
});
