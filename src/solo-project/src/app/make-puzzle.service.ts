import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BoardService } from './board.service';
import { PuzzleBoard } from './Classes/puzzle-board';

@Injectable({
  providedIn: 'root'
})
export class MakePuzzleService extends BoardService {
  private puzzleBoard: PuzzleBoard = new PuzzleBoard();

  constructor() {
    super()
    super.setBoard(this.puzzleBoard);
  }

  confirmStarting() {
    this.puzzleBoard.confirmedStartingSlots();
  }

  getBoard(): Observable<PuzzleBoard> {
    return of(this.puzzleBoard);
  }

  confirmBoard() {
    // Would then add this board to a puzzle object with other data and safe it
    this.puzzleBoard.confirmBoard();
    console.log(this.puzzleBoard);
  }

  showAnswer() {
    this.puzzleBoard.showAnswer();
  }

  from = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Difficulty: new FormControl('', [
      diffValidator
    ])
  })
}

function diffValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = (control.value > 0) && (control.value <= 5);
    return forbidden ? { forbiddenDifficulty: { value: control.value } } : null;
  };
}



