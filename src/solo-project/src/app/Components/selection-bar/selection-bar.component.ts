import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bit } from 'src/app/Classes/boardPieces/bit';
import { Crossover } from 'src/app/Classes/boardPieces/crossover';
import { Gear } from 'src/app/Classes/boardPieces/gear';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
import { Interceptor } from 'src/app/Classes/boardPieces/interceptor';
import { Ramp } from 'src/app/Classes/boardPieces/ramp';
import { Piece } from 'src/app/Classes/piece.enum';
import { boardState } from 'src/app/Classes/puzzle-board';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  @Input() partList: Map<Piece, number>;
  @Input() heldPart: string = null;
  @Input() isPuzzleBoard: boolean = false;
  @Input() boardState: boardState;
  @Input() inPlay: boolean = false;

  @Output() clickHolding = new EventEmitter<Piece>();
  @Output() stepBoard = new EventEmitter();
  @Output() triggerPlay = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() confStartingPieces = new EventEmitter();
  @Output() confPuzzleOutput = new EventEmitter();
  @Output() displayAnswer = new EventEmitter();
  @Output() clearMarbles = new EventEmitter();
  @Output() exampleEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  clicked(part: Piece) {
    this.clickHolding.emit(part);
  }

  delete() {
    this.clicked(Piece.Delete);
  }

  isSelected(piece: string): boolean {
    if (this.heldPart) {
      return this.heldPart == piece;
    }
  }

  hasAmount() {
    return this.partList.get(Piece.Ramp) != -1;
  }


  notStarting() {
    if (this.boardState) {
      return this.boardState != boardState.starting;
    }
    return true;
  }

  getInfo(piece: string): string {
    switch (piece) {
      case Piece.Ramp:
        return "Send the marble in the direction of the Ramp";
      case Piece.Gear:
        return "Flip the direction of any connected Gearbits";
      case Piece.Crossover:
        return "Send the marble in the direction it is already going";
      case Piece.Bit:
        return "Send the marble in the opposite direction then flip direction";
      case Piece.GearBit:
        return "Send the marble in the opposite direction, flip direction and spin any connected Gears";
      case Piece.Interceptor:
        return "Stop and catch the marble";
    }
  }

  getPic(piece: string): string {
    switch (piece) {
      case Piece.Ramp:
        return "assets/ramp.svg";
      case Piece.Gear:
        return "assets/gear.svg";
      case Piece.Crossover:
        return "assets/crossover.svg";
      case Piece.Bit:
        return "assets/bit.svg";
      case Piece.GearBit:
        return "assets/gear-bit.svg";
      case Piece.Interceptor:
        return "assets/interceptor.svg";
    }
  }

  isPlaying() {
    if (this.boardState) {
      return this.boardState == boardState.playing;
    }
    return false;
  }

  private getDiff(piece: any): number {
    switch (piece) {
      case Piece.Ramp:
        return 1;
      case Piece.Gear:
        return 5;
      case Piece.Crossover:
        return 2;
      case Piece.Bit:
        return 3;
      case Piece.GearBit:
        return 6;
      case Piece.Interceptor:
        return 4;
    }
  }

  sortByDiff = (fst, snd) => {
    let fstDiff = this.getDiff(fst.key);
    let sndDiff = this.getDiff(snd.key);
    if (fstDiff > sndDiff) {
      return 1;
    } else {
      return -1;
    }
  }
}
