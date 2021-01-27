import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Board } from '../Classes/boardParts/board';
import { Pin } from '../Classes/boardParts/pin';
import { MakePuzzleService } from './make-puzzle.service';
import { testBoard } from './testingBoard';

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

  it('should convert the test board', ()=>{
    const convertedBoard = new Board(6);
    const tb = new testBoard();
    convertedBoard.slots = JSON.parse(tb.board as string);
    service.convertSlots(convertedBoard.slots);
    expect(convertedBoard.slots[1][3] instanceof Pin).toBeTruthy();
  })
});
