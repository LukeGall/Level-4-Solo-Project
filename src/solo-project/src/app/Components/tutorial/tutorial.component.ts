import { Component, OnInit } from '@angular/core';
import { MarblePair } from 'src/app/Classes/boardParts/marblePair';
import { Bit } from 'src/app/Classes/boardPieces/bit';
import { Crossover } from 'src/app/Classes/boardPieces/crossover';
import { Gear } from 'src/app/Classes/boardPieces/gear';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';
import { Interceptor } from 'src/app/Classes/boardPieces/interceptor';
import { Ramp } from 'src/app/Classes/boardPieces/ramp';
import { Puzzle } from 'src/app/Classes/puzzle';
import { PuzzleBoard } from 'src/app/Classes/puzzle-board';

export interface tableData {
  name: string;
  imgLink: string;
  description: string;
}

const ITEM_DATA: tableData[] = [
  {
    name: "Ramp",
    imgLink: new Ramp(null, null).imgLink,
    description: `The Ramp component is the simplest component and acts as a 'wire' in the computer 
      metaphor that persists throughout the components. 
      The Ramp sends a ball either right or left depending on 
      the direction the curved end is facing, the ramp doesn't care
      which way the ball enters the component, it will send the ball
      right / left only based on the ramps direction.This piece's direction
      is reversible, just click a ramp while holding a 'Ramp'.`
  },
  {
    name: "Crossover",
    imgLink: new Crossover(null).imgLink,
    description: `The Crossover is a non reversible piece
      that continues the direction a ball is travelling 
      into the component but allows the balls to enter from
      either side. If a ball enters from the top left, 
      travelling to the bottom right, it will leave the bottom
      right side of the crossover continuing it's direction. 
      This piece is metaphorically equivalent to wires crossing over in chips.`
  },
  {
    name: "Bit",
    imgLink: new Bit(null, null).imgLink,
    description: `The Bit component acts as a metaphorical
      switch that will change the direction the ball
      will travel based on if it is 'On' (pointing to the right)
      or 'Off' (pointing to the left). If the bit is pointing to
      the right (on) send the balls to the left no matter which
      direction they enter from. Send the balls to the right if
      the switch is pointing to the left (off). These components
      can be used to represent registers that store bit values.`
  },
  {
    name: "Interceptor",
    imgLink: new Interceptor(null).imgLink,
    description: `This component catches a ball and stops the 
      execution of the turing tumble as the marble will no 
      longer be able to reach the end of the board and release 
      another marble. By using the metaphor of electricity this 
      component stops the electricity from flowing through the 
      computer meaning it will stop execution. This component 
      is similar to a shutoff switch inside a regular computer.`
  },
  {
    name: "Gear",
    imgLink: new Gear(null).imgLink,
    description: `Gears are the only components that can be placed
      on Pins as well as Component Slots. Gears only connect GearBits 
      so they can turn together. If a marble touches a Gear it will fall. `
  },
  {
    name: "Gear Bit",
    imgLink: new GearBit(null, null).imgLink,
    description: `This component is a like a bit in that it stores
      state by pointing left or right and will send a ball in the
      opposite direction it is facing and then change direction.
      A Gear Bit not connected to a Gear will act and behave exactly 
      like a normal Bit component. When a gear bit changes direction
      it will also turn any connecting gears this direction which can
      then in turn change other gears and gear bits. The combination of
      this component and the gear makes the game Turing Complete.`
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
    name: "Toggle",
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
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  RampImg: string = new Ramp(null, null).imgLink;
  dataSource = ITEM_DATA;
  optionData = OPTION_DATA;
  displayColumns = ['name', 'image', 'description'];
  exampleMarbles: MarblePair[] = []; 
  examplePuzzle: Puzzle;
  
  constructor() { }

  ngOnInit(): void {
    this.exampleMarbles.push(new MarblePair(2,"blue"));
    this.exampleMarbles.push(new MarblePair(3,"red"));
    this.exampleMarbles.push(new MarblePair(5,"blue"));
    this.examplePuzzle = new Puzzle();
    this.examplePuzzle.title="Example Puzzle"
    this.examplePuzzle.description="This is an example puzzle"
    this.examplePuzzle.difficulty="1"
    this.examplePuzzle.puzzleBoard = new PuzzleBoard();
  }
}