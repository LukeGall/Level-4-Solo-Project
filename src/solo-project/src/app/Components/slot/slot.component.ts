import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Slot } from 'src/app/Classes/boardParts/slot';

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
  @Output() slotClicked: EventEmitter<Pos> = new EventEmitter<Pos>();

  constructor() { }
  ngOnInit(): void {
  }

  click() {
    this.slotClicked.emit(new Pos(this.x, this.y));
  }

  isMarbleFall(){
    if(this.marble){
      return (this.marble.position.x == this.x && this.marble.position.y == this.y)
    } else {
      return false;
    }
  }
}
