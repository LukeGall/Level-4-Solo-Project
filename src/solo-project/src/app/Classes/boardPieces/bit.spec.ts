import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Bit } from './bit';

describe('Bit', () => {
  let bit: Bit;

  beforeEach(() => {
    bit = new Bit(Direction.right, new Pos(0, 0));
  });

  it('should create an instance', () => {
    expect(new Bit(Direction.left, new Pos(0, 0))).toBeTruthy();
  });

  it('should change direction', () => {
    bit.click();
    expect(bit.direction).toEqual(Direction.left);
  })

  it('should send marble based on direction', () => {
    const marble: Marble = new Marble("blue");
    let orgDirection: Direction = bit.direction;
    bit.processMarble(marble);

    expect(marble.direction != orgDirection).toBeTruthy("Marble should be thrown in the opposite direction to the bit");
    expect(bit.direction != orgDirection).toBeTruthy("Direction should change");
  })
});
