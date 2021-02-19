import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { MarblePair } from '../Classes/boardParts/marblePair';
import { Puzzle } from '../Classes/puzzle';
import { boardState, PuzzleBoard } from '../Classes/puzzle-board';
import { parseSlotString } from './convert-functions';

@Injectable({
  providedIn: 'root'
})
export class MakePuzzleService {
  private puzzleBoard: PuzzleBoard = new PuzzleBoard();
  curPuzzle: Puzzle = new Puzzle;

  constructor(private db: AngularFireDatabase) { }

  getPuzzles(location: string): Observable<unknown[]> {
    return this.db.list(location).valueChanges()
  }


  toPuzzle(ele: any): Puzzle {
    let newPuzzle = Object.assign(new Puzzle(), ele);

    newPuzzle.puzzleBoard = this.convertPuzzleBoard(newPuzzle.puzzleBoard);
    return newPuzzle
  }

  private convertPuzzleBoard(pBoard): PuzzleBoard {
    let newPBoard: PuzzleBoard = Object.assign(new PuzzleBoard(), pBoard);

    newPBoard.blueMarbles = pBoard.blueMarbles;
    newPBoard.redMarbles = pBoard.redMarbles;
    newPBoard.startingBlueMarbles = pBoard.startingBlueMarbles;
    newPBoard.startingRedMarbles = pBoard.startingRedMarbles;


    newPBoard.slots = parseSlotString(pBoard.startingSlots);
    newPBoard.slots.forEach((row) => {
      row.forEach((slot) => {
        if (slot && slot.piece) {
          slot.piece.lock();
        }
      })
    })
    newPBoard.startingSlots = pBoard.startingSlots;
    newPBoard.solutionSlot = pBoard.solutionSlot;

    newPBoard.expectedResults = Object.assign(new Array<MarblePair>(), newPBoard.expectedResults);
    newPBoard.collectedMarbles = Object.assign(new Array<MarblePair>(), newPBoard.collectedMarbles);

    // Ensure correct attribute assignment for online puzzles
    newPBoard.inPlayMarble = null;
    newPBoard.inPlay = false;
    newPBoard.setSpeed(1500);

    newPBoard.boardPieces = new Map(newPBoard.boardPieces);
    newPBoard.startingPieces = new Map(newPBoard.startingPieces);

    return newPBoard
  }

  setBoard(board: PuzzleBoard) {
    this.puzzleBoard = board;
  }

  confirmStarting() {
    this.puzzleBoard.confirmedStartingSlots();
  }

  getBoard(): Observable<PuzzleBoard> {
    return of(this.puzzleBoard);
  }

  confirmBoard(userName: string) {
    this.curPuzzle.author = userName;
    this.puzzleBoard.confirmBoard();
    this.curPuzzle.puzzleBoard = cloneDeep(this.puzzleBoard);
  }

  showAnswer() {
    this.puzzleBoard.showAnswer();
  }

  confirmForm() {
    this.curPuzzle.title = this.form.get('Name').value;
    this.curPuzzle.description = this.form.get('Description').value;
    this.curPuzzle.difficulty = this.form.get('Difficulty').value;
    this.curPuzzle.puzzleBoard.slots = null;
    this.curPuzzle.puzzleBoard.boardState = boardState.playing;
    this.curPuzzle.puzzleBoard.boardPieces = [...this.curPuzzle.puzzleBoard.boardPieces];
    this.curPuzzle.puzzleBoard.startingPieces = [...this.curPuzzle.puzzleBoard.startingPieces];

    this.db.list('puzzles').push(JSON.stringify(this.curPuzzle));
  }

  form = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Difficulty: new FormControl('', [
      diffValidator
    ])
  });
}

function diffValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = (control.value > 0) && (control.value <= 5);
    return forbidden ? { forbiddenDifficulty: { value: control.value } } : null;
  };
}







