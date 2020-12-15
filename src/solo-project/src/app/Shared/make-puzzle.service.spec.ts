import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { BoardPiece } from '../Classes/boardPieces/board-piece';
import { Example1 } from '../Classes/exampleBoards/example1';
import { MakePuzzleService } from './make-puzzle.service';

describe('MakePuzzleService', () => {
  let service: MakePuzzleService;
  const stub = {

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: stub },
      ],
    });
    service = TestBed.inject(MakePuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
