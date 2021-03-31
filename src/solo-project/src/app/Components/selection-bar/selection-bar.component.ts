import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';
import { boardState } from 'src/app/Classes/puzzle-board';
import { AssetService } from 'src/app/Shared/asset.service';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionBarComponent implements OnChanges {
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
  @Output() goBack = new EventEmitter();

  notStarting: boolean = this.getNotStarting();
  isPlaying: boolean = this.getIsPlaying();

  constructor(private assets: AssetService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.boardState) {
      this.notStarting = this.getNotStarting();
      this.isPlaying = this.getIsPlaying();
    }
  }


  clicked(part: Piece) {
    this.clickHolding.emit(part);
  }

  delete() {
    this.clicked(Piece.Delete);
  }

  hasAmount() {
    return this.partList.get(Piece.Ramp) != -1;
  }


  getNotStarting() {
    if (this.boardState) {
      return this.boardState != boardState.starting;
    }
    return this.notStarting = true;
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
    return this.assets.getPieceImg(piece);
  }

  getIsPlaying() {
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
