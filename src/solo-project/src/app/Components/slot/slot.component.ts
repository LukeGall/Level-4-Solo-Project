import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Slot } from 'src/app/Classes/boardParts/slot';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  @Input() slot: Slot;
  @Input() x: number;
  @Input() y: number;
  @Input() marble: Marble;
  @Input() heldPiece: Piece;
  @Output() slotClicked: EventEmitter<Pos> = new EventEmitter<Pos>();

  hover = false;

  constructor() { }
  ngOnInit(): void {
  }

  click() {
    this.slotClicked.emit(new Pos(this.x, this.y));
  }

  shouldHover(){
    if (this.slot.partName == "CompSlot"){
      return (this.heldPiece && this.heldPiece != Piece.Delete);
    } else {
      return (this.heldPiece == Piece.Gear);
    }
  }

  getPieceImage(): string{
    if(this.heldPiece == Piece.GearBit) return "assets/gear-bit.svg";
    return "assets/"+this.heldPiece.toLowerCase()+".svg";
  }

  isMarbleFall(){
    if(this.marble){
      return (this.marble.position.x == this.x && this.marble.position.y == this.y)
    } else {
      return false;
    }
  }
}
