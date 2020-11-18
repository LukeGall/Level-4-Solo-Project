import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  partList: Piece[] = [Piece.Ramp, Piece.Gear, Piece.Bit, Piece.Crossover, Piece.GearBit, Piece.Interceptor];
  heldPart: string = null;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getHeldPiece()
      .subscribe(boardPiece => this.heldPart = boardPiece);
  }

  clicked(part: Piece) {
    console.log(part);
    this.boardService.setHolding(part);
  }

  step() {
    this.boardService.stepForward();
  }

  triggerPlay() {
    this.boardService.toggle();
  }

  isSelected(piece: string): boolean {
    if (this.heldPart) {
      return this.heldPart == piece;
    }
  }

  clearBoard() {
    this.boardService.resetBoard();
  }
}
