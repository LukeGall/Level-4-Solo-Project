import { Component, OnInit } from '@angular/core';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';
import { MakePuzzleService } from 'src/app/make-puzzle.service';

@Component({
  selector: 'app-make-puzzle',
  templateUrl: './make-puzzle.component.html',
  styleUrls: ['./make-puzzle.component.scss']
})
export class MakePuzzleComponent implements OnInit {
  puzzleBoard: PuzzleBoard;

  constructor(private puzzleService: MakePuzzleService) { 
    this.puzzleService.getBoard().subscribe(board => {
      this.puzzleBoard = board
    });
  }

  ngOnInit(): void {
  }

}
