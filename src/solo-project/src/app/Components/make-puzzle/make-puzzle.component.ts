import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Piece } from 'src/app/Classes/piece.enum';
import { boardState, PuzzleBoard } from 'src/app/Classes/puzzle-board';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

@Component({
  selector: 'app-make-puzzle',
  templateUrl: './make-puzzle.component.html',
  styleUrls: ['./make-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakePuzzleComponent implements OnInit {
  @Input() puzzleBoard: PuzzleBoard;

  constructor(public puzzleService: MakePuzzleService, private router: Router, public auth: AngularFireAuth) {
    if (!this.puzzleBoard) this.puzzleBoard = new PuzzleBoard();
    this.puzzleService.setBoard(this.puzzleBoard);
  }

  ngOnInit(): void {
  }

  changeSpeed(value: number) {
    this.puzzleBoard.setSpeed(3200-value);
  }

  notStarting(): boolean{
    return this.puzzleBoard.boardState != boardState.starting;
  }

  increaseMarble(colour: string) {
    this.puzzleBoard.increaseMarble(colour);
  }

  decreaseMarble(colour: string) {
    this.puzzleBoard.decreaseMarble(colour);
  }

  clickedFlipper(colour: string) {
    this.puzzleBoard.startMarble(colour);
  }

  setHolding(piece: Piece) {
    this.puzzleBoard.setHeldPiece(piece);
  }

  boardStep() {
    this.puzzleBoard.stepForward();
  }

  triggerPlay() {
    this.puzzleBoard.toggle();
  }

  clearBoard() {
    this.puzzleBoard.resetBoard();
  }

  confirmStarting() {
    this.puzzleBoard.confirmedStartingSlots();
  }

  confirmBoard(userName: string) {
    this.puzzleService.setBoard(this.puzzleBoard);
    this.puzzleService.confirmBoard(userName);
  }

  isDone() {
    if (this.puzzleBoard.boardState) {
      return this.puzzleBoard.boardState == boardState.done;
    }
    return false;
  }

  onSubmit() {
    this.puzzleService.confirmForm();
    this.puzzleService.form.reset()
    this.router.navigateByUrl('');
  }
}
