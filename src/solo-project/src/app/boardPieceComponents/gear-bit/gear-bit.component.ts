import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Marble } from 'src/app/boardParts/marble';
import { Pos } from 'src/app/boardParts/pos';
import { GearBit } from 'src/app/boardPieces/gear-bit';

@Component({
  selector: 'app-gear-bit',
  templateUrl: './gear-bit.component.html',
  styleUrls: ['./gear-bit.component.scss']
})
export class GearBitComponent implements OnInit {
  @Input() gearBit:GearBit;
  @Input() private x:number;
  @Input() private y:number;
  marbleInPlay:Marble;

  

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getInPlayMarble().subscribe(marble => this.marbleInPlay = marble);
  }

  click(){
    this.gearBit.switchDirection();
    this.boardService.gearSpin(new Pos(this.x,this.y));
  }

  ifMarble(): boolean{
    if(this.marbleInPlay){
      if(this.marbleInPlay.position.x == this.gearBit.position.x && this.marbleInPlay.position.y == this.gearBit.position.y)
        return true;
    }
    return false;
  }
}
