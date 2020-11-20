import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Bit } from 'src/app/Classes/boardPieces/bit';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
import { Ramp } from 'src/app/Classes/boardPieces/ramp';


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

  needsFlip(){
    let p = this.piece;
    if(p instanceof Ramp || p instanceof Bit || p instanceof GearBit){
      if(p.direction == Direction.left){
        return true;
      }
    }
    return false;
  }

  isLocked() {
    return this.piece.locked;
  }
}
