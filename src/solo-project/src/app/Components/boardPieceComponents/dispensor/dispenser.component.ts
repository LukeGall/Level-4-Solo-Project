import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marble } from 'src/app/Classes/boardParts/marble';


@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {
  @Input() marbleColour: string;
  @Input() marbles: Marble[]
  @Output() increaseMarble = new EventEmitter<string>(); 
  @Output() decreaseMarble = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  increaseAmount(){
    this.increaseMarble.emit(this.marbleColour);
  }

  decreaseAmount(){
    this.decreaseMarble.emit(this.marbleColour);
  }
}
