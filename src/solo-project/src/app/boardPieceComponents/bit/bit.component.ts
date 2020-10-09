import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {
  @Input() piece: BoardPiece;
  
  constructor() { }

  ngOnInit(): void {
  }

}
