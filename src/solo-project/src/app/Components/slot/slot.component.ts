import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Slot } from 'src/app/Classes/boardParts/slot';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent implements OnChanges {
  @Input() slot: Slot;
  @Input() x: number;
  @Input() y: number;
  @Input() marble: Marble;
  @Input() heldPiece: Piece;

  @Output() slotClicked: EventEmitter<Pos> = new EventEmitter<Pos>();

  shouldHover: boolean = this.getShouldHover();
  img: string = this.getImg();
  pieceImage: string = this.getPieceImage();
  marbleFall: boolean = this.isMarbleFall();

  hover = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.slot){
      this.img = this.getImg();
    }

    if(changes.marble){
      this.marbleFall = this.isMarbleFall();
    }

    if(changes.heldPiece){
      this.shouldHover = this.getShouldHover();
      this.pieceImage = this.getPieceImage();
    }
  }

  click() {
    this.slotClicked.emit(new Pos(this.x, this.y));
  }

  getShouldHover(){
    if(this.slot){
      if (this.slot.partName == "CompSlot"){
        return (this.heldPiece && this.heldPiece != Piece.Delete);
      } else {
        return (this.heldPiece == Piece.Gear);
      }
    }
  }

  getImg(){
    if(this.slot){
      if(this.slot.partName == "CompSlot"){
        return "assets/compslot.svg";
      } else {
        return "assets/pin.svg";
      }
    }
  }

  getPieceImage(): string{
    if(this.heldPiece){
      if(this.heldPiece == Piece.GearBit) return "assets/gear-bit.svg";
      return "assets/"+this.heldPiece.toLowerCase()+".svg";
    }
  }

  isMarbleFall(){
    if(this.marble){
      return (this.marble.position.x == this.x && this.marble.position.y == this.y)
    } else {
      return false;
    }
  }
}
