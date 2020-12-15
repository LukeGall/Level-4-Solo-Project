import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {  Observable, of } from 'rxjs';
import { Puzzle } from '../Classes/puzzle';
import { boardState, PuzzleBoard } from '../Classes/puzzle-board';
import { cloneDeep } from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';
import { Marble } from '../Classes/boardParts/marble';
import { Piece } from '../Classes/piece.enum';
import { Slot } from '../Classes/boardParts/slot';
import { CompSlot } from '../Classes/boardParts/comp-slot';
import { Pin } from '../Classes/boardParts/pin';
import { BoardPiece } from '../Classes/boardPieces/board-piece';
import { Ramp } from '../Classes/boardPieces/ramp';
import { Direction } from '../Classes/boardParts/direction';
import { Pos } from '../Classes/boardParts/pos';
import { Gear } from '../Classes/boardPieces/gear';
import { Crossover } from '../Classes/boardPieces/crossover';
import { Bit } from '../Classes/boardPieces/bit';
import { GearBit } from '../Classes/boardPieces/gear-bit';
import { Interceptor } from '../Classes/boardPieces/interceptor';
import { MarblePair } from '../Classes/boardParts/marblePair';

@Injectable({
  providedIn: 'root'
})
export class MakePuzzleService {
  private puzzleBoard: PuzzleBoard = new PuzzleBoard();
  curPuzzle: Puzzle = new Puzzle;
  curAmount: number = 0;

  constructor(private db: AngularFireDatabase) { }

  getPuzzles(location: string):Observable<unknown[]> {
    return this.db.list(location).valueChanges()
  }
  

  toPuzzle(ele: any): Puzzle {
    let newPuzzle = Object.assign(new Puzzle(), ele);

    newPuzzle.puzzleBoard = this.convertPuzzleBoard(newPuzzle.puzzleBoard);
    return newPuzzle
  }

  private convertMarArray(arr: Marble[]) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Object.assign(new Marble(), arr[i]);
    };
  }

  convertSlots(arr: Slot[][]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j]) {
          if (arr[i][j].partName == "CompSlot") {
            arr[i][j] = Object.assign(new CompSlot(), arr[i][j]);
          } else {
            arr[i][j] = Object.assign(new Pin(), arr[i][j]);
          }
          if (arr[i][j].piece) {
            arr[i][j].piece = this.convertPiece(arr[i][j].piece);
          }
        }
      }
    }
  }

  private convertPiece(piece: BoardPiece): BoardPiece {
    let ret: BoardPiece;
    switch (piece.type) {
      case Piece.Ramp:
        ret = new Ramp(Direction.stopped, new Pos(0, 0))
        break;
      case Piece.Gear:
        ret = new Gear(new Pos(0,0))
        break;
      case Piece.Crossover:
        ret = new Crossover(new Pos(0, 0))
        break;
      case Piece.Bit:
        ret = new Bit(Direction.stopped, new Pos(0, 0))
        break;
      case Piece.GearBit:
        ret = new GearBit(Direction.stopped, new Pos(0, 0));
        break;
      case Piece.Interceptor:
        ret = new Interceptor(new Pos(0, 0));
        break;
    }
    
    // Make sure puzzles with incorrect asset path get the correct path
    piece.imgBlueMarble = ret.imgBlueMarble;
    piece.imgRedMarble = ret.imgRedMarble;
    piece.imgLink = ret.imgLink;
    ret = Object.assign(ret, piece);

    return ret;
  }

  private convertPuzzleBoard(pBoard): PuzzleBoard {
    let newPBoard: PuzzleBoard = Object.assign(new PuzzleBoard(), pBoard);

    newPBoard.blueMarbles = Object.assign(new Array<Marble>(), newPBoard.blueMarbles);
    newPBoard.redMarbles = Object.assign(new Array<Marble>(), newPBoard.redMarbles);
    newPBoard.startingBlueMarbles = Object.assign(new Array<Marble>(), newPBoard.startingBlueMarbles);
    newPBoard.startingRedMarbles = Object.assign(new Array<Marble>(), newPBoard.startingRedMarbles);
    this.convertMarArray(newPBoard.blueMarbles);
    this.convertMarArray(newPBoard.redMarbles);
    this.convertMarArray(newPBoard.startingBlueMarbles);
    this.convertMarArray(newPBoard.startingRedMarbles);

    newPBoard.slots = Object.assign(new Array<Array<Slot>>(), newPBoard.slots);
    newPBoard.startingSlots = Object.assign(new Array<Array<Slot>>(), newPBoard.startingSlots);
    newPBoard.solutionSlot = Object.assign(new Array<Array<Slot>>(), newPBoard.solutionSlot);
    this.convertSlots(newPBoard.slots);
    this.convertSlots(newPBoard.solutionSlot);
    this.convertSlots(newPBoard.startingSlots);

    newPBoard.expectedResults = Object.assign(new Array<MarblePair>(), newPBoard.expectedResults);
    newPBoard.collectedMarbles = Object.assign(new Array<MarblePair>(), newPBoard.collectedMarbles);

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



