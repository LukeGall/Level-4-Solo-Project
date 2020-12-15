import { Direct } from 'protractor/built/driverProviders';
import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Interceptor } from './interceptor';

describe('Interceptor', () => {
  it('should create an instance', () => {
    expect(new Interceptor(new Pos(0, 0))).toBeTruthy();
  });

  it('should stop marbles', () => {
    const marble: Marble = new Marble("blue");
    const interceptor: Interceptor = new Interceptor(new Pos(0, 0));
    interceptor.processMarble(marble);
    expect(marble.direction).toEqual(Direction.stopped);
  })
});
