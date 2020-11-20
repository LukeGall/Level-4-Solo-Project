import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Board } from 'src/app/Classes/boardParts/board';

@Component({
  selector: 'app--plain-board',
  templateUrl: './plain-board.component.html',
  styleUrls: ['./plain-board.component.scss']
})
export class PlainBoardComponent implements OnInit {
  board: Board;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
      this.boardService.getBoard().subscribe(board => { this.board = board }
      );
  }

  

  changeSpeed(value: number) {
    this.boardService.setSpeed(value);
  }

}
