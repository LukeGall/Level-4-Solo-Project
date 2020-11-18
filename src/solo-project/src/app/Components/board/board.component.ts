import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Board } from 'src/app/Classes/boardParts/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Board;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getBoard().subscribe(board =>
      {this.board = board}
    );
  }

  checkPin(name: string): Boolean{
    return name == "Pin";
  }

  checkCompSlot(name: string): Boolean{
    return name == "CompSlot";
  }

  changeSpeed(value:number){
    this.boardService.setSpeed(value);
  }

}
