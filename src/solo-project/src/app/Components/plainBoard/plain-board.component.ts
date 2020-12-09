import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Board } from 'src/app/Classes/boardParts/board';
import { Slot } from 'src/app/Classes/boardParts/slot';
import { Example1 } from 'src/app/Classes/exampleBoards/example1';
import { Example2 } from 'src/app/Classes/exampleBoards/example2';
import { Example3 } from 'src/app/Classes/exampleBoards/example3';
import { Example4 } from 'src/app/Classes/exampleBoards/example4';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-plain-board',
  templateUrl: './plain-board.component.html',
  styleUrls: ['./plain-board.component.scss']
})
export class PlainBoardComponent implements OnInit {
  board: Board = null;

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(18);
  }

  setExample(examNumber: number){
    this.board.setExample(examNumber);
  }


  changeSpeed(value: number) {
    this.board.setSpeed(value);
  }

  increaseMarble(colour: string) {
    this.board.increaseMarble(colour);
  }

  decreaseMarble(colour: string) {
    this.board.decreaseMarble(colour);
  }

  clickedFlipper(colour: string) {
    this.board.startMarble(colour);
  }

  setHolding(piece: Piece) {
    this.board.setHeldPiece(piece);
  }

  boardStep() {
    this.board.stepForward();
  }

  triggerPlay() {
    this.board.toggle();
  }

  clearBoard() {
    this.board.clearPieces();
  }

}
