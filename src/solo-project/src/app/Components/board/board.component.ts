import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/Classes/boardParts/board';
import { Pos } from 'src/app/Classes/boardParts/pos';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor() { }

  ngOnInit(): void {
    if(!this.board){
      this.board = new Board(6);
    }
  }

  checkPin(name: string): Boolean {
    return name == "Pin";
  }

  checkCompSlot(name: string): Boolean {
    return name == "CompSlot";
  }

  slotClicked(pos: Pos){
    this.board.clickPiece(pos);
  }

}
