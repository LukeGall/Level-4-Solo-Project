import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from './boardParts/board';
import { CompSlot } from './boardParts/comp-slot';
import { Direction } from './boardParts/direction';
import { Marble } from './boardParts/marble';
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
  board: Board = new Board(6);
  heldPiece: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  getBoard(): Observable<Board> {
    return of(this.board);
  }

  setHolding(type: String) {
    this.heldPiece.next(type);
  }

  getHeldPiece(): BehaviorSubject<String> {
    return this.heldPiece;
  }

  // Used to check that the board pieces stay even when the heldPart changes
  logBoard() {
    this.board.slots[0].forEach(slot => {
      if (slot) {
        if (slot.piece) {
          console.log(slot.piece.getName());
        }
      }
    }
    );
  }

  trigger(colour: String) {
    if (colour == "blue") {
      this.board.inPlayMarble = this.board.blueMarbles.pop()
    } else {
      this.board.inPlayMarble = this.board.redMarbles.pop()
    }

    console.log(this.board.inPlayMarble)
    this.dropMarble(this.board.inPlayMarble)
  }

  private dropMarble(marble: Marble) {
    if (marble != undefined) {
      // marble is in play when the pos.x and y is >=0 and <= 11 it is in play
      // Then check the component in the compSlot if not compSlot then fall(). If compslot there then call that compoents process Marble and it should update the position
      // if it gets to x = 11 then decide what flipper it will trigger or if middle use that to decide trigger as well.
      while (this.marbleInBounds(marble)) {
        let slot = this.board.slots[marble.position.x][marble.position.y];
        console.log(marble.position.x)

        if (slot instanceof CompSlot) {
          if (slot.piece != null) {
            slot.piece.ProcessMarble(marble);
          } else {
            this.marbleFall(marble);
            return;
          }
        }
      }
      this.workOutFlipperColour(marble);
    }
  }

  private marbleInBounds(marble: Marble): boolean {
    return (marble.position.x >= 0 && marble.position.x < 10 && marble.position.y >= 0 && marble.position.y <= 10)
  }

  private marbleFall(marble: Marble) {
    // Update marble to fall on screen
    console.log("Marble has fallen");
  }

  private workOutFlipperColour(marble: Marble) {
    let posY = marble.position.y;
    if (posY >= 0 && posY < 5) {
      this.board.collectedMarbles.push(marble);
      this.trigger("blue");
    } else if (posY > 5 && posY <= 10) {
      this.board.collectedMarbles.push(marble);
      this.trigger("red");
    } else {
      this.marbleFall(marble);
    }
  }
}
