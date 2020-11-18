import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Pin } from 'src/app/Classes/boardParts/pin';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Gear } from 'src/app/Classes/boardPieces/gear';

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
