import { Component, OnInit } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

@Component({
  selector: 'app-default-puzzles',
  templateUrl: './default-puzzles.component.html',
  styleUrls: ['./default-puzzles.component.scss']
})
export class DefaultPuzzlesComponent implements OnInit {

  puzzles: Puzzle[] = null;
  puzzleId: number;

  constructor(private puzzleService: MakePuzzleService) {

  }

  ngOnInit(): void {
    this.puzzles = this.puzzleService.getPuzzles('default-puzzles');
  }

  setPuzzleTo(x: number) {
    this.puzzleId = x;
    console.log(this.puzzles[x]);
  }

  checkPuzzleId(): boolean {
    if (this.puzzleId == undefined) {
      return false;
    }
    return true;
  }


}
