import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';
import { Puzzle } from 'src/app/Classes/puzzle';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';

@Component({
  selector: 'app-play-puzzle',
  templateUrl: './play-puzzle.component.html',
  styleUrls: ['./play-puzzle.component.scss']
})
export class PlayPuzzleComponent implements AfterContentChecked {
  @Input() puzzle: Puzzle;
  board: PuzzleBoard = null;
  @Output() home = new EventEmitter<string>();
  @Output() nextPuzzle = new EventEmitter();

  constructor() { }

  ngAfterContentChecked(): void {
    this.board = this.puzzle.puzzleBoard;
  }

  changeSpeed(value: number) {
    this.board.setSpeed(3200-value);
  }

  goHome() {
    this.home.emit();
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
    this.board.resetBoard();
  }

  wonPuzzle(): boolean {
    return this.board.correctResults;
  }

  showAnswer() {
    this.puzzle.puzzleBoard.showAnswer();
  }

  clearMarbles() {
    this.puzzle.puzzleBoard.clearMarbles();
  }

  hasUserName(): boolean {
    if (this.puzzle.author) {
      if (this.puzzle.author != "default") {
        return true;
      }
    }
    return false;
  }
}
