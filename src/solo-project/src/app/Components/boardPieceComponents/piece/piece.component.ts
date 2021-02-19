import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Bit } from 'src/app/Classes/boardPieces/bit';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
import { Ramp } from 'src/app/Classes/boardPieces/ramp';
import { Piece } from 'src/app/Classes/piece.enum';


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() piece: BoardPiece;
  @Input() marble: Marble;

  constructor() { }

  ngOnInit(): void {
  }

  needsFlip() {
    let p = this.piece;
    if (p.type == Piece.Ramp || p.type == Piece.Bit || p.type == Piece.GearBit) {
      if (p.direction == Direction.left) {
        return true;
      }
    }
    return false;
  }

  getImg() {
    if (this.piece.type == Piece.GearBit) return "assets/gear-bit.svg";
    return "assets/" + this.piece.type.toLowerCase() + ".svg";
  }

  getBlueImg() {
    if (this.piece.type == Piece.GearBit) {
      return "assets/gear-bit-blue.svg";
    } else if (this.piece.type == Piece.Gear) {
      return this.getImg();
    }
    else {
      return "assets/" + this.piece.type.toLowerCase() + "-blue.svg";
    }
  }

  getRedImg() {
    if (this.piece.type == Piece.GearBit) {
      return "assets/gear-bit-red.svg";
    } else if (this.piece.type == Piece.Gear) {
      return this.getImg();
    } else {
      return "assets/" + this.piece.type.toLowerCase() + "-red.svg";
    }
  }


  isLocked() {
    return this.piece.locked;
  }
}
