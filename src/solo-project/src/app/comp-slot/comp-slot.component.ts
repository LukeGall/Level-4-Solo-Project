import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { CompSlot } from '../boardParts/comp-slot';
import { Direction } from '../boardParts/direction';
import { BitComponent } from '../boardPieceComponents/bit/bit.component';
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

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  click() {
    var heldPiece: String;
    this.boardService.getHeldPiece().subscribe(piece => heldPiece = piece);
    if(this.compSlot.piece == null || this.compSlot.piece.getName() != heldPiece){
      this.compSlot.piece = this.createPiece(heldPiece);
    } 
    console.log("Clicked from comp slot")
  }

  checkRamp(): boolean {
    return this.compSlot.piece instanceof Ramp;
  }

  checkCrossover(): boolean {
    return this.compSlot.piece instanceof Crossover;
  }

  checkBit(): boolean {
    return this.compSlot.piece instanceof Bit;
  }

  checkInterceptor(): boolean {
    return this.compSlot.piece instanceof Interceptor;
  }

  checkGearBit(): boolean {
    return this.compSlot.piece instanceof GearBit;
  }

  createPiece(type: String): BoardPiece {
    switch (type) {
      case "Ramp":
        return (new Ramp(Direction.left));
      case "Crossover":
        return (new Crossover());
      case "GearBit":
        return (new GearBit());
      case "Interceptor":
        return (new Interceptor());
      case "Bit":
        return (new Bit());
      default:
        return (null);
    }
  }
}
