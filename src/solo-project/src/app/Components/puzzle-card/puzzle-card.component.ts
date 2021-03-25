import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';

@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzleCardComponent implements OnInit {
  @Input() puzzle: Puzzle = new Puzzle();
  @Input() index: number;
  @Output() puzzleClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.puzzleClicked.emit(this.index);
  }

  hasUserName(): boolean {
    if (this.puzzle.author) {
      if (this.puzzle.author != "default") {
        return true;
      }
    }
    return false;
  }
}
