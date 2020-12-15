import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { GearBit } from './gear-bit';

describe('GearBit', () => {
  let gBit: GearBit; 7
  beforeEach(() => {
    gBit = new GearBit(Direction.right, new Pos(0, 0));
  });

  it('should create an instance', () => {
    expect(new GearBit(Direction.left, new Pos(0, 0))).toBeTruthy();
  });

  it('should change direction', () => {
    gBit.switchDirection();
    expect(gBit.direction).toEqual(Direction.left);
  });

  it('should send marble in opposite direction', () => {
    const marble: Marble = new Marble("blue");
    const orgDirection: Direction = gBit.direction;
    gBit.processMarble(marble);
    expect(marble.direction != orgDirection).toBeTruthy("Should change direction to it's opposite")
  })
});
