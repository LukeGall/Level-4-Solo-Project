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
    let board = new Board();
    board.slots[0] = new Array<Slot>();
    board.slots[1] = new Array<Slot>();

    board.slots[0].push(null,null,new Pin(),new CompSlot(), new Pin(), null,new Pin(),new CompSlot(),new Pin(), null, null);
    board.slots[1].push(null,new Pin(),new CompSlot(),new Pin(),new CompSlot(),new Pin(),new CompSlot(),new Pin(),new CompSlot(),new Pin(), null);
    
    for (var i = 2; i < 10; i++) {
      board.slots[i] = new Array<Slot>();
      for (var j = 0; j < 11; j++) {
        board.slots[i].push(((j+i) % 2 == 0) ? new Pin() : new CompSlot());
      }
    }

    board.slots[10] = new Array<Slot>();
    board.slots[10].push(null,null,null,null,new Pin(), new CompSlot(), new Pin(),null,null,null,null);

    return board;
  }
}
