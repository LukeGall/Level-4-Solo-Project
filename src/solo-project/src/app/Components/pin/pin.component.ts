import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Pin } from 'src/app/Classes/boardParts/pin';
import { Pos } from 'src/app/Classes/boardParts/pos';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pin: Pin;
  @Input() private x: number;
  @Input() private y: number;
  @Output() slotClicked: EventEmitter<Pos> = new EventEmitter<Pos>();


  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  click(){
    this.slotClicked.emit(new Pos(this.x,this.y));
  }
}
