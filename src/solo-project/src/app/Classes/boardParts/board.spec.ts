import { Ramp } from '../boardPieces/ramp';
import { Board } from './board';
import { Direction } from './direction';

describe('Board', () => {
  it('should create an instance', () => {
    expect(new Board(6)).toBeTruthy();
  });

  it('should have a set number of marbles',()=>{
    expect(new Board(10).blueMarbles.length).toEqual(10);
  })

  it('should reset the pieces correctly',()=>{
    const board = new Board(10);
    board.slots[5][5].piece = new Ramp(null,null);

    board.clearPieces();

    expect(board.slots[5][5].piece).toBeFalsy();
  })
});
