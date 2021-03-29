import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/Classes/boardParts/board';
import { Pos } from 'src/app/Classes/boardParts/pos';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() gapAtBottom: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (!this.board) {
      this.board = new Board(6);
    }
  }

  slotClicked(pos: Pos) {
    this.board.clickPiece(pos);
  }
}
