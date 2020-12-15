import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flipper',
  templateUrl: './flipper.component.html',
  styleUrls: ['./flipper.component.scss']
})
export class FlipperComponent implements OnInit {
  @Input() colour: string;
  @Input() inPlay: boolean = false;

  @Output() clickedFlipper = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  trigger() {
    this.clickedFlipper.emit(this.colour);
  }

}
