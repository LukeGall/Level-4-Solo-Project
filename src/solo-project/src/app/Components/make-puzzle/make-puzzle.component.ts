import { Component, OnInit } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

@Component({
  selector: 'app-make-puzzle',
  templateUrl: './make-puzzle.component.html',
  styleUrls: ['./make-puzzle.component.scss']
})
export class MakePuzzleComponent implements OnInit {
  puzzleBoard: PuzzleBoard;

  constructor(private puzzleService: MakePuzzleService) { 
    this.puzzleBoard = new PuzzleBoard();
    this.puzzleService.setBoard(this.puzzleBoard);
  }

  ngOnInit(): void {
  }

  changeSpeed(value: number) {
    this.puzzleBoard.setSpeed(value);
  }

  increaseMarble(colour: string){
    this.puzzleBoard.increaseMarble(colour);
  }

  decreaseMarble(colour: string){
    this.puzzleBoard.decreaseMarble(colour);
  }

  clickedFlipper(colour: string){
    this.puzzleBoard.startMarble(colour);
  }

  setHolding(piece: Piece){
    this.puzzleBoard.setHeldPiece(piece);
  }

  boardStep(){
    this.puzzleBoard.stepForward();
  }

  triggerPlay(){
    this.puzzleBoard.toggle();
  }

  clearBoard(){
    this.puzzleBoard.clearPieces();
  }

  confirmStarting(){
    this.puzzleBoard.confirmedStartingSlots();
  }

  confirmBoard(){
    this.puzzleBoard.confirmBoard();
  }

}
