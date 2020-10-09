import { Component, Input, OnInit } from '@angular/core';
import { BoardPiece } from 'src/app/boardPieces/board-piece';

@Component({
  selector: 'app-crossover',
  templateUrl: './crossover.component.html',
  styleUrls: ['./crossover.component.scss']
})
export class CrossoverComponent implements OnInit {

  @Input() piece: BoardPiece;
  constructor() { }

  ngOnInit(): void {
  }

  click(){
    console.log("From the crossover")
  }

}
