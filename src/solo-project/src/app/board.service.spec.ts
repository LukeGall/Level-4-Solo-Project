import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import { Board } from './Classes/boardParts/board';
import { Direction } from './Classes/boardParts/direction';
import { Pos } from './Classes/boardParts/pos';
import { Gear } from './Classes/boardPieces/gear';
import { GearBit } from './Classes/boardPieces/gear-bit';
import { Piece } from './Classes/piece.enum';


describe('BoardServiceService', () => {
  let service: BoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should let me access the board', ()=>{
    let board:Board;
    service.getBoard().subscribe(
      b => {board = b}
    );
    expect(board).toBeTruthy();
  })
});
