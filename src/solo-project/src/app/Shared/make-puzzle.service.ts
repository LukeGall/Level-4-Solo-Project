import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
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

  constructor(private db: AngularFireDatabase) { }

  getPuzzles(location: string): Observable<unknown[]> {
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
        ret = new Gear(new Pos(0, 0))
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

  // Goes from 16.2kb to 289 bytes
  slotsToString(boardSlots: Slot[][]): string {
    var slots = "";
    boardSlots.forEach((row) => {
      row.forEach((slot) => {
        if (!slot) {
          slots += " x";
        } else if (!slot.piece) {
          switch (slot.partName) {
            case "Pin":
              slots += " .";
              break;
            case "CompSlot":
              slots += " ,";
              break;
          }
        } else {
          switch (slot.piece.type) {
            case "Ramp":
              slots += " R";
              break;
            case "Gear":
              slots += " g";
              break;
            case "Bit":
              slots += " B";
              break;
            case "Crossover":
              slots += " C";
              break;
            case "GearBit":
              slots += " G";
              break;
            case "Interceptor":
              slots += " I";
              break;
          }
          if (slot.piece instanceof Ramp || slot.piece instanceof Bit || slot.piece instanceof GearBit) {
            if (slot.piece.direction == Direction.left) {
              slots += "l";
            } else {
              slots += "r";
            }
          }
        }
      })
      slots += "\n";
    })

    return slots;
  }

  parseSlotString(slotString: string): Slot[][] {
    var slots = new Array<Array<Slot>>();


    slotString.split("\n").forEach(function (row, xPos) {
      var slotRow = new Array<Slot>();
      var yPos = -1;

      row.split(" ").forEach((str) => {
        var slot: Slot;
        if (str) {
          yPos++;
          switch (str) {
            case ('x'):
              slotRow.push(null);
              break;
            case ('.'):
              slotRow.push(new Pin());
              break;
            case (','):
              slotRow.push(new CompSlot());
              break;
            case ('Rl'):
              slot = new CompSlot();
              slot.piece = new Ramp(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Rr'):
              slot = new CompSlot();
              slot.piece = new Ramp(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Bl'):
              slot = new CompSlot();
              slot.piece = new Bit(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Br'):
              slot = new CompSlot();
              slot.piece = new Bit(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Gl'):
              slot = new CompSlot();
              slot.piece = new GearBit(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Gr'):
              slot = new CompSlot();
              slot.piece = new GearBit(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('C'):
              slot = new CompSlot();
              slot.piece = new Crossover(new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('I'):
              slot = new CompSlot();
              slot.piece = new Interceptor(new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('g'):
              slot = (xPos + yPos % 2 != 0) ? new CompSlot() : new Pin();
              slot.piece = new Gear(new Pos(xPos, yPos));
              slotRow.push(slot);
              break;
            default:
              slot = (xPos + yPos % 2 != 0) ? new CompSlot() : new Pin();
              slotRow.push(slot);
          }
        }
      })
      slots.push(slotRow);
    })
    return slots
  }
}

function diffValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = (control.value > 0) && (control.value <= 5);
    return forbidden ? { forbiddenDifficulty: { value: control.value } } : null;
  };
}





