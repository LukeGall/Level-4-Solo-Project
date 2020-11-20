import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  @Input() partList: Map<Piece,number>;
  @Input() heldPart: string = null;
  @Output() clickHolding = new EventEmitter<Piece>();
  @Output() stepBoard = new EventEmitter();
  @Output() triggerPlay = new EventEmitter();
  @Output() reset = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clicked(part: Piece) {
    console.log(part);
    this.clickHolding.emit(part);
  }

  delete(){
    this.clicked(Piece.Delete);
  }

  step() {
    this.stepBoard.emit();
  }

  trigger() {
    this.triggerPlay.emit();
  }

  isSelected(piece: string): boolean {
    if (this.heldPart) {
      return this.heldPart == piece;
    }
  }

  hasAmount(){
    return this.partList.get(Piece.Ramp) != -1; 
  }

  clearBoard() {
    this.reset.emit();
  }
}
