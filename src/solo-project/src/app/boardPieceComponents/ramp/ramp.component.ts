import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Marble } from 'src/app/boardParts/marble';
import { BoardPiece } from 'src/app/boardPieces/board-piece';
import { Ramp } from 'src/app/boardPieces/ramp';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {
  @Input() ramp: Ramp;
  marbleInPlay: Marble;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getInPlayMarble().subscribe(marble => this.marbleInPlay = marble);
  }

  clickRamp(){
    this.ramp.changeDirection();
  }

  ifMarble(): boolean{
    if(this.marbleInPlay){
      if(this.marbleInPlay.position.x == this.ramp.position.x && this.marbleInPlay.position.y == this.ramp.position.y)
        return true;
    }
    return false;
  }
}
