import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Board } from 'src/app/boardParts/board';
import { Marble } from 'src/app/boardParts/marble';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {
  @Input() marbleColour: String
  marbles: Marble[] 

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getBoard().subscribe(board => {
      if(this.marbleColour == "red"){
        this.marbles = board.redMarbles;
      } else {
        this.marbles = board.blueMarbles;
      }
    })
  }

}
