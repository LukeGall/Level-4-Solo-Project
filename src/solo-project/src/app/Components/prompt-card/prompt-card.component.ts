import { Component, Input, OnInit } from '@angular/core';
import { boardState } from 'src/app/Classes/puzzle-board';

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent implements OnInit {
  @Input() boardState: boardState;

  constructor() { }

  ngOnInit(): void {
  }

  promptOutput(): string {
    switch (this.boardState) {
      case (boardState.starting):
        return "Place pieces on the board to act as your starting setup for your puzzle! These pieces will be locked in once confirmed"
      case (boardState.solutionMaking):
        return "Now place the pieces that would act as a solution to your puzzle and then release the marbles! Click confirm output once you are happy with the collected marbles. This will be the target output for your puzzle!"
      case (boardState.done):
        return "Now add a title, a difficulty rating, and a brief description describing what the puzzle is all about!"
      case (boardState.playing):
        return "Add pieces from the restricted amount to get the desired result shown below!"
      default:
        return "Default case"
    }
  }

}
