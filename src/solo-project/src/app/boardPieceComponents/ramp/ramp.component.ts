import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';
import { Ramp } from 'src/app/boardPieces/ramp';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {
  @Input() ramp: Ramp;

  constructor() { }

  ngOnInit(): void {
  }

  clickRamp(){
    this.ramp.changeDirection();
  }
}
