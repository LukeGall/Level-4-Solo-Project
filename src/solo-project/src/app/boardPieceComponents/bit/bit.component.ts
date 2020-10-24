import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Marble } from 'src/app/boardParts/marble';
import { Bit } from 'src/app/boardPieces/bit';

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {
  @Input() bit: Bit;
  marbleInPlay:Marble;
  
  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getInPlayMarble().subscribe(marble => this.marbleInPlay = marble);
  }

  ifMarble(): boolean{
    if(this.marbleInPlay){
      if(this.marbleInPlay.position.x == this.bit.position.x && this.marbleInPlay.position.y == this.bit.position.y)
        return true;
    }
    return false;
  }

}
