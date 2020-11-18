import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from './Classes/boardParts/board';
import { Direction } from './Classes/boardParts/direction';
import { Pos } from './Classes/boardParts/pos';
import { Bit } from './Classes/boardPieces/bit';
import { BoardPiece } from './Classes/boardPieces/board-piece';
import { Crossover } from './Classes/boardPieces/crossover';
import { Gear } from './Classes/boardPieces/gear';
import { GearBit } from './Classes/boardPieces/gear-bit';
import { Interceptor } from './Classes/boardPieces/interceptor';
import { Ramp } from './Classes/boardPieces/ramp';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  // Board slots is an array of 11 by 11 
  private board: Board = new Board(6);
  heldPiece: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  getBoard(): Observable<Board> {
    return of(this.board);
  }

  setHolding(type: string) {
    this.heldPiece.next(type);
  }

  getHeldPiece(): BehaviorSubject<string> {
    return this.heldPiece;
  }

  increaseMarble(colour: string) {
    this.board.increaseMarble(colour);
  }

  decreaseMarble(colour: string) {
    this.board.decreaseMarble(colour);
  }

  resetBoard() {
    this.board.clearPieces();
  }

  startMarble(colour: string) {
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