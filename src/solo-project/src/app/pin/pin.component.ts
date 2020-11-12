import { Component, Input, OnInit } from '@angular/core';
import { Pin } from '../boardParts/pin';
import { BoardService } from '../board.service';
import { BoardPiece } from '../boardPieces/board-piece';
import { Gear } from '../boardPieces/gear';
import { Pos } from '../boardParts/pos';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pin: Pin;
  @Input() private x: number;
  @Input() private y: number;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  click(){
    let newPiece = this.boardService.createPiece(new Pos(this.x,this.y));
    if(this.pin.piece == null && newPiece instanceof Gear) {
      this.pin.piece = newPiece;
      this.boardService.newGearComp(new Pos(this.x,this.y));
    } 
  }
}
