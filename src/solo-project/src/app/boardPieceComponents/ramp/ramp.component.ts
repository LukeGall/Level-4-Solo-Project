import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {
  @Input() piece: BoardPiece;

  constructor() { }

  ngOnInit(): void {
  }
}
