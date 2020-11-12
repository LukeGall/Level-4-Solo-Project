import { Direction } from 'readline';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Crossover } from './crossover';

describe('Crossover', () => {
  it('should create an instance', () => {
    expect(new Crossover(new Pos(0,0))).toBeTruthy();
  });

  it('should send marble in current direction',()=>{
    const marble: Marble = new Marble("blue");
    const orgDirection:Direction = marble.direction;
    const crossover: Crossover = new Crossover(new Pos(0,0));
    crossover.processMarble(marble);
    expect(marble.direction).toEqual(orgDirection);
  })
});
