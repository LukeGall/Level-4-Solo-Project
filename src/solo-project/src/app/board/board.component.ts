import { Component, OnInit } from '@angular/core';
import { Board } from '../boardParts/board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Board;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
  }

  checkPin(name: String): Boolean{
    return name == "Pin";
  }

  checkCompSlot(name: String): Boolean{
    return name == "CompSlot";
  }

}
