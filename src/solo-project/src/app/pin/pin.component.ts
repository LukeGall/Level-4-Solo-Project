import { Component, Input, OnInit } from '@angular/core';
import { Pin } from '../boardParts/pin';
import { BoardService } from '../board.service';
import { BoardPiece } from '../boardPieces/board-piece';
import { Gear } from '../boardPieces/gear';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pin: Pin;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  click(){
    var heldPiece: BoardPiece;
    this.boardService.getHeldPiece().subscribe(piece => heldPiece=piece);
    if(heldPiece instanceof Gear){
      this.pin.piece = heldPiece;
    }
  }
}
