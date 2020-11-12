import { Component, Input, OnInit } from '@angular/core';
import { Marble } from 'src/app/boardParts/marble';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-non-gb-piece',
  templateUrl: './non-gb-piece.component.html',
  styleUrls: ['./non-gb-piece.component.scss']
})
export class NonGbPieceComponent implements OnInit {
  @Input() piece: BoardPiece;
  @Input() marble: Marble;

  constructor() { }

  ngOnInit(): void {
  }

}
