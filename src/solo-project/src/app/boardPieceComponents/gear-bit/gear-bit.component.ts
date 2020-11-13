import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Direction } from 'src/app/boardParts/direction';
import { Marble } from 'src/app/boardParts/marble';
import { Pos } from 'src/app/boardParts/pos';
import { GearBit } from 'src/app/boardPieces/gear-bit';

@Component({
  selector: 'app-gear-bit',
  templateUrl: './gear-bit.component.html',
  styleUrls: ['./gear-bit.component.scss']
})
export class GearBitComponent implements OnInit {
  @Input() gearBit: GearBit;
  @Input() private x: number;
  @Input() private y: number;
  @Input() marble: Marble;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }

  click() {
    this.gearBit.click();
    this.boardService.gearSpin(new Pos(this.x, this.y));
  }

  needsFlip() {
    let gb = this.gearBit;
    if (gb.direction == Direction.left) {
      return true;
    }
    return false;
  }
}
