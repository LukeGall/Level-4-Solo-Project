import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
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

  private joins: number[] = this.getJoins();
  hasL: boolean = false;
  hasR: boolean = false;
  hasU: boolean = false;
  hasD: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.piece){
      this.imgLink = this.getImg()
      this.blueImgLink =this.getBlueImg();
      this.redImgLink = this.getRedImg();
      this.needsFlip = this.getNeedsFlip();
      this.isLocked = this.getLocked();
      this.joins = this.getJoins();
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

  getJoins(): number[]{
    if(this.piece && this.piece instanceof GearBit){
      console.log(this.piece.joins);
      const joins = this.piece.joins;
      if(joins.includes(1)) this.hasL = true;
      if(joins.includes(2)) this.hasU = true;
      if(joins.includes(3)) this.hasR = true;
      if(joins.includes(4)) this.hasD = true;

      console.log(this.hasL);
      return joins;
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
