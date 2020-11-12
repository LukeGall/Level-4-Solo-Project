import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { CompSlot } from '../boardParts/comp-slot';
import { Direction } from '../boardParts/direction';
import { Pos } from '../boardParts/pos';
import { Bit } from '../boardPieces/bit';
import { BoardPiece } from '../boardPieces/board-piece';
import { Crossover } from '../boardPieces/crossover';
import { Gear } from '../boardPieces/gear';
import { GearBit } from '../boardPieces/gear-bit';
import { Interceptor } from '../boardPieces/interceptor';
import { Ramp } from '../boardPieces/ramp';

@Component({
  selector: 'app-comp-slot',
  templateUrl: './comp-slot.component.html',
  styleUrls: ['./comp-slot.component.scss']
})
export class CompSlotComponent implements OnInit {
  @Input() compSlot: CompSlot;
  // For the gear/ gearbit location
  @Input()  x:number;
  @Input()  y:number;

  constructor(public boardService: BoardService) { }

  // Todo Allow gears to be placed on gearBit

  ngOnInit(): void {
  }

  click() {
    let newPiece = this.boardService.createPiece(new Pos(this.x,this.y));
    if (this.compSlot.piece == null || !(typeof(this.compSlot.piece) == typeof(newPiece))){
      this.compSlot.piece = newPiece;
      if(this.compSlot.piece instanceof GearBit){
        this.boardService.newGearComp(new Pos(this.x,this.y));
      }
    }
  }

  checkGearBit(): boolean {
    return this.compSlot.piece instanceof GearBit;
  }
}
