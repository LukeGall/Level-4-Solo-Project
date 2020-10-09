import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-gear-bit',
  templateUrl: './gear-bit.component.html',
  styleUrls: ['./gear-bit.component.scss']
})
export class GearBitComponent implements OnInit {
  @Input() piece:BoardPiece;
  constructor() { }

  ngOnInit(): void {
  }

}
