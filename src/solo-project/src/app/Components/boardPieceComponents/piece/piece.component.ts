import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { Piece } from 'src/app/Classes/piece.enum';


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieceComponent implements OnChanges {
  @Input() piece: BoardPiece;
  @Input() marble: Marble;
  imgLink: string = this.getImg();
  blueImgLink: string = this.getBlueImg();
  redImgLink: string = this.getRedImg();
  needsFlip: boolean = this.getNeedsFlip();
  isLocked: boolean = this.getLocked();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.piece){
      this.imgLink = this.getImg()
      this.blueImgLink =this.getBlueImg();
      this.redImgLink = this.getRedImg();
      this.needsFlip = this.getNeedsFlip();
      this.isLocked = this.getLocked();
    }
  }

  getNeedsFlip() : boolean{
    let p = this.piece;
    if(p){

      if (p.type == Piece.Ramp || p.type == Piece.Bit || p.type == Piece.GearBit) {
        if (p.direction == Direction.left) {
          return true;
        }
      }
      return false;
    }
  }

  getImg(): string {
    if(this.piece){
      if (this.piece.type == Piece.GearBit) return "assets/gear-bit.svg";
      return "assets/" + this.piece.type.toLowerCase() + ".svg";
    }
  }

  getBlueImg() {
    if(this.piece){

      if (this.piece.type == Piece.GearBit) {
        return "assets/gear-bit-blue.svg";
      } else if (this.piece.type == Piece.Gear) {
        return this.getImg();
      }
      else {
        return "assets/" + this.piece.type.toLowerCase() + "-blue.svg";
      }
    }
  }

  getRedImg() {
    if(this.piece){
      if (this.piece.type == Piece.GearBit) {
        return "assets/gear-bit-red.svg";
      } else if (this.piece.type == Piece.Gear) {
        return this.getImg();
      } else {
        return "assets/" + this.piece.type.toLowerCase() + "-red.svg";
      }
    }
  }


  getLocked() {
    if(this.piece){

      return this.piece.locked;
    }
  }
}
