import { Component, OnInit } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';
import { slice } from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-default-puzzles',
  templateUrl: './default-puzzles.component.html',
  styleUrls: ['./default-puzzles.component.scss']
})
export class DefaultPuzzlesComponent implements OnInit {

  puzzles: Puzzle[] = new Array<Puzzle>();
  puzzleId: number;
  puzzleList: Puzzle[] = [];
  pageSize = 5;
  curIndex = 0;

  constructor(private puzzleService: MakePuzzleService, public auth: AngularFireAuth) {

  }

  ngOnInit(): void {
    this.puzzleService.getPuzzles('default-puzzles').subscribe(
      list => {
        this.puzzles = new Array<Puzzle>();
        list.forEach(puzzle => {
          this.puzzles.push(this.puzzleService.toPuzzle(JSON.parse(puzzle as string)))
        })
        this.puzzleList = this.puzzles.slice(0,this.pageSize);
      }
    );
  }

  setPuzzleTo(x: number) {
    this.puzzleId = x + this.pageSize * this.curIndex;
  }

  checkPuzzleId(): boolean {
    if (this.puzzleId == undefined) {
      return false;
    }
    return true;
  }

  goHome() {
    this.puzzleId = null;
  }

  changePage(index: any) {
    this.curIndex = index.pageIndex;
    let changeAmount = index.pageIndex * this.pageSize;
    this.puzzleList = this.puzzles.slice(0 + changeAmount, this.pageSize + changeAmount);
  }


}
