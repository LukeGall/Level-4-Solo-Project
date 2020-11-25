import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';

@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss']
})
export class PuzzleCardComponent implements OnInit {
  @Input() puzzle: Puzzle;
  @Input() index: number;
  @Output() puzzleClicked : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.puzzleClicked.emit(this.index);
  }
}
