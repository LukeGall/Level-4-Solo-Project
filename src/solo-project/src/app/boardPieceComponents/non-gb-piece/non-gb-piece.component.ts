import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/boardParts/direction';
import { Marble } from 'src/app/boardParts/marble';
import { Bit } from 'src/app/boardPieces/bit';
import { BoardPiece } from 'src/app/boardPieces/board-piece';
import { GearBit } from 'src/app/boardPieces/gear-bit';
import { Ramp } from 'src/app/boardPieces/ramp';

@Component({
  selector: 'app-non-gb-piece',
  templateUrl: './non-gb-piece.component.html',
  styleUrls: ['./non-gb-piece.component.scss']
})
export class NonGbPieceComponent implements OnInit {
  @Input() piece: BoardPiece;
  @Input() marble: Marble;

  constructor() { }

  ngOnInit(): void {
  }

  needsFlip(){
    let p = this.piece;
    if(p instanceof Ramp || p instanceof Bit){
      if(p.direction == Direction.left){
        return true;
      }
    }
    return false;
  }
}
