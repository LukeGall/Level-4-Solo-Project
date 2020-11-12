import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from './boardParts/board';
import { CompSlot } from './boardParts/comp-slot';
import { Direction } from './boardParts/direction';
import { Marble } from './boardParts/marble';
import { MarblePair } from './boardParts/marblePair';
import { Pos } from './boardParts/pos';
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
  private board: Board = new Board(6);
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

  increaseMarble(colour: String) {
    this.board.increaseMarble(colour);
  }

  decreaseMarble(colour: String) {
    this.board.decreaseMarble(colour);
  }

  resetBoard() {
    this.board.clearPieces();
  }

  startMarble(colour: String) {
    this.board.startMarble(colour);
  }


  stepForward() {
    this.board.stepForward();
  }

  toggle() {
    this.board.toggle();

  }

  setSpeed(newSpeed: number) {
    this.board.setSpeed(newSpeed);
  }


  createPiece(pos: Pos): BoardPiece {
    switch (this.heldPiece.getValue()) {
      case "Ramp":
        return (new Ramp(Direction.left, pos));
      case "Crossover":
        return (new Crossover(pos));
      case "GearBit":
        return (new GearBit(Direction.left, pos));
      case "Interceptor":
        return (new Interceptor(pos));
      case "Bit":
        return (new Bit(Direction.left, pos));
      case "Gear":
        return (new Gear(pos));
      default:
        return (null);
    }

  }



  newGearComp(position: Pos) {
    this.board.newGearComp(position);
  }

  gearSpin(position: Pos) {
    this.board.gearSpin(position);
  }
}

// MAKE IT MORE READABLE with variable names