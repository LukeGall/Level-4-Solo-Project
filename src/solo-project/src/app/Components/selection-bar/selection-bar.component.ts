import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Piece } from 'src/app/Classes/piece.enum';
import { boardState } from 'src/app/Classes/puzzle-board';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  @Input() partList: Map<Piece, number>;
  @Input() heldPart: string = null;
  @Input() isPuzzleBoard: boolean = false;
  @Input() boardState : boardState;

  @Output() clickHolding = new EventEmitter<Piece>();
  @Output() stepBoard = new EventEmitter();
  @Output() triggerPlay = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() confStartingPieces = new EventEmitter();
  @Output() confPuzzleOutput = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clicked(part: Piece) {
    console.log(part);
    this.clickHolding.emit(part);
  }

  delete() {
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

  hasAmount() {
    return this.partList.get(Piece.Ramp) != -1;
  }

  clearBoard() {
    this.reset.emit();
  }

  confirmStarting() {
    this.confStartingPieces.emit();
  }

  confirmOutput(){
    this.confPuzzleOutput.emit();
  }

  notStarting(){
    if(this.boardState){
      return this.boardState != boardState.starting;
    }
    return true;
  }

  isPlaying(){
    if(this.boardState){
      return this.boardState == boardState.playing;
    }
  }
}
