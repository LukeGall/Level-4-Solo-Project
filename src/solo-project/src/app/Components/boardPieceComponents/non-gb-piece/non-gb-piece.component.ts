import { Component, Input, OnInit } from '@angular/core';
import { Direction } from 'src/app/Classes/boardParts/direction';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Bit } from 'src/app/Classes/boardPieces/bit';
import { BoardPiece } from 'src/app/Classes/boardPieces/board-piece';
import { Ramp } from 'src/app/Classes/boardPieces/ramp';


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
