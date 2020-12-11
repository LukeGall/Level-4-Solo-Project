import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

import { DefaultPuzzlesComponent } from './default-puzzles.component';

describe('DefaultPuzzlesComponent', () => {
  let component: DefaultPuzzlesComponent;
  let fixture: ComponentFixture<DefaultPuzzlesComponent>;
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
      declarations: [ DefaultPuzzlesComponent ],
      providers: [{provide: MakePuzzleService,useValue: stub}, {provide: AngularFireAuth, useValue: stub}, {provide: AngularFireDatabase, useValue: stub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
