import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';
import { cloneDeep, cloneWith } from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-online-puzzles',
  templateUrl: './online-puzzles.component.html',
  styleUrls: ['./online-puzzles.component.scss']
})
export class OnlinePuzzlesComponent implements OnInit {
  puzzles: Puzzle[] = new Array<Puzzle>();
  puzzleId: number;
  puzzlePage: Puzzle[] = [];
  fullPuzzles: Puzzle[] = [];
  pageSize = 5;
  curIndex = 0;
  fullDiffList = ["1", "2", "3", "4", "5"];
  difficultyList: string[] = [];
  frmControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('diffInput') diffInput: ElementRef<HTMLInputElement>;

  constructor(private puzzleService: MakePuzzleService, public auth: AngularFireAuth) {

  }

  ngOnInit(): void {
    this.puzzleService.getPuzzles('puzzles').subscribe(
      list => {
        this.puzzles = new Array<Puzzle>();
        list.forEach(puzzle => {
          this.puzzles.push(this.puzzleService.toPuzzle(JSON.parse(puzzle as string)))
        })
        this.puzzlePage = this.puzzles.slice(0, this.pageSize);
        this.fullPuzzles = cloneDeep(this.puzzles);
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

  changePage(index: number) {
    this.curIndex = index;
    let changeAmount = index * this.pageSize;
    this.puzzlePage = this.puzzles.slice(0 + changeAmount, this.pageSize + changeAmount);
  }

  private changeDif() {
    this.difficultyList.sort();
    this.puzzles = [];
    this.fullPuzzles.forEach(puzzle => {
      if (this.difficultyList.includes(puzzle.difficulty)) {
        this.puzzles.push(cloneDeep(puzzle));
      }
    })
    this.puzzlePage = this.puzzles.slice(0, 5);
  }

  resetDif() {
    this.puzzles = cloneWith(this.fullPuzzles);
    this.changePage(0);
  }

  remove(diff: string) {
    const index = this.difficultyList.indexOf(diff);

    if (index >= 0) {
      this.difficultyList.splice(index, 1);
      if (this.difficultyList.length == 0) {
        this.resetDif();
      } else {
        this.changeDif();
      }
    }
  }

  addDiff(event: MatChipInputEvent) {
    const value = event.value;
    if (this.fullDiffList.includes(value)) {
      if (!this.difficultyList.includes(value)) {
        this.difficultyList.push(value);
        this.changeDif();
      }
    }
    event.input.value = '';
    this.frmControl.setValue(null);
  }

  addAutoCmpt(event: MatAutocompleteSelectedEvent) {
    const val = event.option.viewValue;
    this.diffInput.nativeElement.value = '';
    this.frmControl.setValue(null);

    console.log(val);
    if (!(this.difficultyList.includes(val))) {
      this.difficultyList.push(val);
      this.changeDif();
    }
  }
}
