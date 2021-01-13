import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CompSlot } from 'src/app/Classes/boardParts/comp-slot';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pos } from 'src/app/Classes/boardParts/pos';

@Component({
  selector: 'app-comp-slot',
  templateUrl: './comp-slot.component.html',
  styleUrls: ['./comp-slot.component.scss']
})
export class CompSlotComponent implements OnInit {
  @Input() compSlot: CompSlot;
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
