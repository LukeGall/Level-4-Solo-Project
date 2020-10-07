import { Injectable } from '@angular/core';
import { Board } from './boardParts/board';
import { CompSlot } from './boardParts/comp-slot';
import { Pin } from './boardParts/pin';
import { Slot } from './boardParts/slot';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  getBoard(): Board {
    let board = new Board(1, 2);
    for (var i = 0; i < 3; i++) {
      board.slots[i] = (new Array<Slot>());
      for (var j = 0; j < 4; j++) {
        board.slots[i].push(((j+i) % 2 == 0) ? new Pin() : new CompSlot());
      }
    }
    return board;
  }
}
