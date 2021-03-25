import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarblePair } from 'src/app/Classes/boardParts/marblePair';
import { Puzzle } from 'src/app/Classes/puzzle';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';

export interface tableData {
  name: string;
  imgLink: string;
  description: string;
  isLike: string;
  gifLink: string;
}

const ITEM_DATA: tableData[] = [
  {
    name: "Ramp",
    imgLink: "assets/ramp.svg",
    description: ` 
      The Ramp sends a ball either right or left depending on 
      the direction the curved end is facing, the ramp doesn't care
      which way the ball enters the component, it will send the ball
      right / left only based on the ramps direction.This piece's direction
      is reversible, just click a ramp while holding a 'Ramp'.`,
    isLike: 'A electrical wire in a computer circuit, where the balls act as electricity',
    gifLink: "assets/ramp-gif.gif",
  },
  {
    name: "Crossover",
    imgLink: "assets/crossover.svg",
    description: `The Crossover is a non reversible piece
      that continues the direction a ball is travelling 
      into the component but allows the balls to enter from
      either side. If a ball enters from the top left, 
      travelling to the bottom right, it will leave the bottom
      right side of the crossover continuing it's direction. 
      `,
    isLike: 'Two wires crossing over (but not touching) each other, to allow different sets of electricity cross over each other',
    gifLink: "assets/crossover-gif.gif",
  },
  {
    name: "Bit",
    imgLink: "assets/bit.svg",
    description: `If the bit is pointing to
      the right (on) send the balls to the left no matter which
      direction they enter from. Send the balls to the right if
      the switch is pointing to the left (off). These components
      can be used to represent registers that store bit values.`,
    isLike: 'An electronic switch inside a chip, can change the direction electricity is flowing based on if its "on" or "off".',
    gifLink: "assets/bit-gif.gif",
  },
  {
    name: "Interceptor",
    imgLink: "assets/interceptor.svg",
    description: `This component catches a ball and stops the 
      execution of the turing tumble as the marble will no 
      longer be able to reach the end of the board and release 
      another marble. By using the metaphor of electricity this 
      component stops the electricity from flowing through the 
      computer meaning it will stop execution.`,
    isLike: 'Is similar to a shutoff switch in a real life computer',
    gifLink: "assets/interceptor-gif.gif",
  },
  {
    name: "Gear",
    imgLink: "assets/gear.svg",
    description: `Gears are the only components that can be placed
      on Pins as well as Component Slots. Gears only connect GearBits 
      so they can turn together. If a marble touches a Gear it will fall. When a Gear Bit is connected to a Gear, a small arrow will be displayed`,
    isLike: 'Connectors in more complicated switch combinations',
    gifLink: "assets/gear-gif.gif",
  },
  {
    name: "Gear Bit",
    imgLink: "assets/gear-bit.svg",
    description: `This component is a like a bit in that it stores
      state by pointing left or right and will send a ball in the
      opposite direction it is facing and then change direction.
      A Gear Bit not connected to a Gear will act and behave exactly 
      like a normal Bit component. When a Gear Bit changes direction
      it will also turn any connecting gears this direction which can
      then in turn change other Gears and Gear Bits.`,
    isLike: 'Can be used to create set switches, latches, flip flops and more complicated components',
    gifLink: "assets/gear-bit-gif.gif"
  }
]

const OPTION_DATA: any[] = [
  {
    name: "Step Forward",
    description: `The Step Forward button will pause the movement
      of the marble and then move it down
      one level, following it's path.`
  },
  {
    name: "Play / Pause",
    description: "Will pause / play the movement of the in play marble"
  },
  {
    name: "Reset Board",
    description: "Will remove of the pieces, collected pieces and in play marble from the board"
  },
  {
    name: "Reset Marbles",
    description: "Removes the currently in play marble and the collected marbles at the bottom of the board."
  },
]

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialComponent implements OnInit {
  dataSource = ITEM_DATA;
  optionData = OPTION_DATA;
  displayColumns = ['name', 'description', 'isLike', 'gif'];
  exampleMarbles: MarblePair[] = [];
  examplePuzzle: Puzzle;

  constructor() { }

  ngOnInit(): void {
    this.exampleMarbles.push(new MarblePair(2, "blue"));
    this.exampleMarbles.push(new MarblePair(3, "red"));
    this.exampleMarbles.push(new MarblePair(5, "blue"));
    this.examplePuzzle = new Puzzle();
    this.examplePuzzle.title = "Example Puzzle"
    this.examplePuzzle.description = "This is an example puzzle"
    this.examplePuzzle.difficulty = "1"
    this.examplePuzzle.puzzleBoard = new PuzzleBoard();
    this.examplePuzzle.puzzleBoard.expectedResults = this.exampleMarbles;
  }
}
