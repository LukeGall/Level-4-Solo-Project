import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Marble } from 'src/app/boardParts/marble';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-non-gb-piece',
  templateUrl: './non-gb-piece.component.html',
  styleUrls: ['./non-gb-piece.component.scss']
})
export class NonGbPieceComponent implements OnInit {
  @Input() piece: BoardPiece;
  inPlayMarble: Marble;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getInPlayMarble().subscribe(marble => this.inPlayMarble = marble);
  }

}
