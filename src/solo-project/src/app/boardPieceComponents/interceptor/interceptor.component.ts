import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.scss']
})
export class InterceptorComponent implements OnInit {
  @Input() piece:BoardPiece;
  constructor() { }

  ngOnInit(): void {
  }

}
