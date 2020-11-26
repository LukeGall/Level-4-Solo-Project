import { Component, OnInit } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';

@Component({
  selector: 'app-online-puzzles',
  templateUrl: './online-puzzles.component.html',
  styleUrls: ['./online-puzzles.component.scss']
})
export class OnlinePuzzlesComponent implements OnInit {
  puzzles: Puzzle[] = null;
  puzzleId : number;

  constructor(private puzzleService: MakePuzzleService) { 
    
  }

  ngOnInit(): void {
    this.puzzles = this.puzzleService.getPuzzles('puzzles');
  }

  setPuzzleTo(x: number){
    this.puzzleId = x;
    console.log(this.puzzleId);
  }

  checkPuzzleId(): boolean{
    if (this.puzzleId == undefined){
      return false;
    } 
    return true;
  }

  goHome(){
    this.puzzleId = null;
  }
}
