import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Ramp } from './ramp';

describe('Ramp', () => {
  it('should create an instance', () => {
    expect(new Ramp(Direction.left,new Pos(0,0))).toBeTruthy();
  });

  it('Should send marbles in the ramps direction',()=>{
    const marble: Marble = new Marble("blue");
    const ramp: Ramp = new Ramp(Direction.left, new Pos(0,0));
    ramp.processMarble(marble);
    expect(marble.direction).toEqual(ramp.direction);
  })
});
