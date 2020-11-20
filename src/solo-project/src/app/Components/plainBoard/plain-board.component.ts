import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/Classes/boardParts/board';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app--plain-board',
  templateUrl: './plain-board.component.html',
  styleUrls: ['./plain-board.component.scss']
})
export class PlainBoardComponent implements OnInit {
  board: Board;

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(6);
  }


  changeSpeed(value: number) {
    this.board.setSpeed(value);
  }

  increaseMarble(colour: string){
    this.board.increaseMarble(colour);
  }

  decreaseMarble(colour: string){
    this.board.decreaseMarble(colour);
  }

  clickedFlipper(colour: string){
    this.board.startMarble(colour);
  }

  setHolding(piece: Piece){
    this.board.setHeldPiece(piece);
  }

  boardStep(){
    this.board.stepForward();
  }

  triggerPlay(){
    this.board.toggle();
  }

  clearBoard(){
    this.board.clearPieces();
  }

}
