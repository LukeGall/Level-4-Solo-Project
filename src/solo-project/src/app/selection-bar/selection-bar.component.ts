import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  partList: String[] = ["Ramp", "Gear", "Bit", "Crossover", "GearBit", "Interceptor"];
  heldPart: String = null;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getHeldPiece()
      .subscribe(boardPiece => this.heldPart = boardPiece);
  }

  clicked(part: String) {
    this.boardService.setHolding(part);
  }

  step() {
    this.boardService.stepForward();
  }

  triggerPlay() {
    this.boardService.toggle();
  }

  isSelected(piece: String): boolean {
    if (this.heldPart) {
      return this.heldPart == piece;
    }
  }

  clearBoard() {
    this.boardService.resetBoard();
  }
}
