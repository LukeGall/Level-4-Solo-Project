import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { CompSlot } from 'src/app/Classes/boardParts/comp-slot';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Gear } from 'src/app/Classes/boardPieces/gear';
import { GearBit } from 'src/app/Classes/boardPieces/gear-bit';

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
  @Input() marble: Marble;

  constructor(public boardService: BoardService) { }

  // Todo Allow gears to be placed on gearBit

  ngOnInit(): void {
  }

  click() {
    this.boardService.createPiece(new Pos(this.x,this.y));
  }

  checkGearBit(): boolean {
    return this.compSlot.piece instanceof GearBit;
  }
}
