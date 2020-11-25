import { Component, Input, OnInit } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';

@Component({
  selector: 'app-play-puzzle',
  templateUrl: './play-puzzle.component.html',
  styleUrls: ['./play-puzzle.component.scss']
})
export class PlayPuzzleComponent implements OnInit {
  @Input() board: PuzzleBoard = null;

  constructor() { }

  ngOnInit(): void {
    if(!this.board){
      this.board = new PuzzleBoard();
    }
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
