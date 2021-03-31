import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
import { Piece } from 'src/app/Classes/piece.enum';
import { AssetService } from 'src/app/Shared/asset.service';


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
  blueImgLink: string = this.getMarbleImg('blue');
  redImgLink: string = this.getMarbleImg('red');
  needsFlip: boolean = this.getNeedsFlip();
  isLocked: boolean = this.getLocked();

  private joins: number[] = this.getJoins();
  hasL: boolean = false;
  hasR: boolean = false;
  hasU: boolean = false;
  hasD: boolean = false;

  constructor(private assets: AssetService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.piece){
      this.imgLink = this.getImg()
      this.blueImgLink =this.getMarbleImg('blue');
      this.redImgLink = this.getMarbleImg('red');
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
      return this.assets.getPieceImg(this.piece.type);
    }
  }

  getJoins(): number[]{
    if(this.piece && this.piece instanceof GearBit){
      this.hasL = this.hasU = this.hasD = this.hasR = false;
      const joins = this.piece.joins;
      if(joins.includes(1)) this.hasL = true;
      if(joins.includes(2)) this.hasU = true;
      if(joins.includes(3)) this.hasR = true;
      if(joins.includes(4)) this.hasD = true;
      return joins;
    }
  }

  getMarbleImg(colour:string) {
    if(this.piece){
      if (this.piece.type == Piece.GearBit) {
        return "assets/gear-bit-"+colour+".svg";
      } else if (this.piece.type == Piece.Gear) {
        return this.getImg();
      } else {
        return "assets/" + this.piece.type.toLowerCase() + "-"+colour+".svg";
      }
    }
  }


  getLocked() {
    if(this.piece){

      return this.piece.locked;
    }
  }
}
