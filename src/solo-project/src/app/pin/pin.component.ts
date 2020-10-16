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
    var heldPiece: String;
    this.boardService.getHeldPiece().subscribe(piece => heldPiece=piece);
    if((this.pin.piece == null || this.pin.piece.getName() != heldPiece) && heldPiece=="Gear"){
      console.log("Gear created");
      this.pin.piece = new Gear();
      console.log(this.x);
      this.boardService.newGearComp(new Pos(this.x,this.y));
    } 
  }
}
