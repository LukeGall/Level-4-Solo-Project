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
import { Piece } from './Classes/piece.enum';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  // Board slots is an array of 11 by 11 
  private board: Board = new Board(6);
  heldPiece: BehaviorSubject<Piece> = new BehaviorSubject<Piece>(null);

  getBoard(): Observable<Board> {
    return of(this.board);
  }

  setHolding(type: Piece) {
    console.log(type);
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


  createPiece(pos: Pos) {
    this.board.createPiece(pos, this.heldPiece.getValue());
  }



  newGearComp(position: Pos) {
    this.board.newGearComp(position);
  }

  gearSpin(position: Pos) {
    this.board.gearSpin(position);
  }
}

// MAKE IT MORE READABLE with variable names