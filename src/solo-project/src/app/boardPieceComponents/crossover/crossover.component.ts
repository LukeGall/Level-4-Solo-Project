import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Marble } from 'src/app/boardParts/marble';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-crossover',
  templateUrl: './crossover.component.html',
  styleUrls: ['./crossover.component.scss']
})
export class CrossoverComponent implements OnInit {

  @Input() piece: BoardPiece;
  marbleInPlay: Marble;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getInPlayMarble().subscribe(marble => this.marbleInPlay = marble);
  }

  click(){
    console.log("From the crossover")
  }

  ifMarble(): boolean{
    if(this.marbleInPlay){
      if(this.marbleInPlay.position.x == this.piece.position.x && this.marbleInPlay.position.y == this.piece.position.y)
        return true;
    }
    return false;
  }

}
