import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marble } from 'src/app/Classes/boardParts/marble';
import { Pin } from 'src/app/Classes/boardParts/pin';
import { Pos } from 'src/app/Classes/boardParts/pos';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pin: Pin;
  @Input() marble: Marble;
  @Input() private x: number;
  @Input() private y: number;
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
