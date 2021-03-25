import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DispenserComponent implements OnInit {
  @Input() marbleColour: string;
  @Input() marbles: number;
  @Input() buttons: boolean = true;
  @Output() increaseMarble = new EventEmitter<string>();
  @Output() decreaseMarble = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  increaseAmount() {
    this.increaseMarble.emit(this.marbleColour);
  }

  decreaseAmount() {
    this.decreaseMarble.emit(this.marbleColour);
  }
}
