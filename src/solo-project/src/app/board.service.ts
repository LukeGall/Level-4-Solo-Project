import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from './boardParts/board';
import { CompSlot } from './boardParts/comp-slot';
import { Pin } from './boardParts/pin';
import { Slot } from './boardParts/slot';
import { Bit } from './boardPieces/bit';
import { BoardPiece } from './boardPieces/board-piece';
import { Crossover } from './boardPieces/crossover';
import { Gear } from './boardPieces/gear';
import { GearBit } from './boardPieces/gear-bit';
import { Interceptor } from './boardPieces/interceptor';
import { Ramp } from './boardPieces/ramp';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  // Board slots is an array of 11 by 11 
  board: Board;
  heldPiece: BehaviorSubject<BoardPiece> = new BehaviorSubject<BoardPiece>(null);

  getBoard(): Observable<Board> {
    this.board = new Board();
    this.board.slots[0] = new Array<Slot>();
    this.board.slots[1] = new Array<Slot>();

    this.board.slots[0].push(null, null, new Pin(), new CompSlot(), new Pin(), null, new Pin(), new CompSlot(), new Pin(), null, null);
    this.board.slots[1].push(null, new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), null);

    for (var i = 2; i < 10; i++) {
      this.board.slots[i] = new Array<Slot>();
      for (var j = 0; j < 11; j++) {
        this.board.slots[i].push(((j + i) % 2 == 0) ? new Pin() : new CompSlot());
      }
    }

    this.board.slots[10] = new Array<Slot>();
    this.board.slots[10].push(null, null, null, null, new Pin(), new CompSlot(), new Pin(), null, null, null, null);

    return of(this.board);
  }

  // TODO Add more boardPieces
  setHolding(type: String) {
    switch (type) {
      case "Gear":
        this.heldPiece.next(new Gear());
        break;
      case "Ramp":
        this.heldPiece.next(new Ramp());
        break;
      case "Crossover":
        this.heldPiece.next(new Crossover());
        break;
      case "GearBit":
        this.heldPiece.next(new GearBit());
        break;
      case "Interceptor":
        this.heldPiece.next(new Interceptor());
        break;
      case "Bit":
        this.heldPiece.next(new Bit());
        break;
      default:
        this.heldPiece.next(null);
    }
  }

  getHeldPiece(): BehaviorSubject<BoardPiece> {
    return this.heldPiece;
  }

  // Used to check that the board pieces stay even when the heldPart changes
  logBoard() {
    this.board.slots[0].forEach(slot => {
      if (slot) {
        if(slot.piece){
          console.log(slot.piece.getName());
        }
      }
    }
    );
  }
}
