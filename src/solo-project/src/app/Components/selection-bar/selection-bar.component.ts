import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  @Input() partList: Map<Piece,number>;
  @Input() heldPart: string = null;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  clicked(part: Piece) {
    console.log(part);
    this.boardService.setHolding(part);
  }

  delete(){
    this.clicked(Piece.Delete);
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

  hasAmount(){
    return this.partList.get(Piece.Ramp) != -1; 
  }

  clearBoard() {
    this.boardService.resetBoard();
  }
}
