import { Gear } from '../boardPieces/gear';
import { GearBit } from '../boardPieces/gear-bit';
import { Ramp } from '../boardPieces/ramp';
import { Piece } from '../piece.enum';
import { Board } from './board';
import { Direction } from './direction';
import { Marble } from './marble';
import { Pos } from './pos';

describe('Board', () => {
  it('should create an instance', () => {
    expect(new Board(6)).toBeTruthy();
  });

  it('should have a set number of marbles', () => {
    expect(new Board(10).blueMarbles.length).toEqual(10);
  })

  it('should reset the pieces correctly', () => {
    const board = new Board(10);
    board.slots[5][5].piece = new Ramp(null, null);

    board.resetBoard();

    expect(board.slots[5][5].piece).toBeFalsy();
  })

  it('Should allow the marbles to increase and decrease', () => {
    let board: Board = new Board(6);
    expect(board.blueMarbles.length).toEqual(6);

    board.increaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(7);

    board.decreaseMarble("blue");
    board.decreaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(5);
  })

  it('Should release marbles', () => {
    let board: Board = new Board(6);

    expect(board.startMarble("blue"))
    expect(board.inPlayMarble).toBeTruthy();
  })

  it('Should change gears to same direction when connected', () => {
    let board: Board = new Board(6);
    const positions: Pos[] = [new Pos(2, 1), new Pos(2, 3), new Pos(2, 5)];

    board.slots[2][1].piece = new GearBit(Direction.right, positions[0]);
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear(new Pos(2, 2));
    board.slots[2][4].piece = new Gear(new Pos(2, 4));
    board.gearSpin(new Pos(2, 2));
    board.gearSpin(new Pos(2, 4));

    let firDir: Direction;
    let sameDirs: boolean = true;

    positions.forEach(function (pos, i) {
      if (i == 0) {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) {
          if (piece.direction != firDir) {
            sameDirs = false;
          }
        }
      }
    })

    expect(sameDirs).toBeTruthy();
  })

  it('Should make connected gears change directions together', () => {
    let board: Board = new Board(6);
    const positions: Pos[] = [new Pos(2, 1), new Pos(2, 3), new Pos(2, 5)];

    board.slots[2][1].piece = new GearBit(Direction.right, positions[0]);
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear(new Pos(2, 2));
    board.slots[2][4].piece = new Gear(new Pos(2, 4));
    board.gearSpin(new Pos(2, 2));
    board.gearSpin(new Pos(2, 4));

    // first spin

    board.gearSpin(positions[0]);

    let firDir: Direction;
    let sameDirs: boolean = true;

    positions.forEach(function (pos, i) {
      if (i == 0) {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) {
          if (piece.direction != firDir) {
            sameDirs = false;
          }
        }
      }
    })

    expect(sameDirs).toBeTruthy();

    // Second spin
    board.gearSpin(positions[0]);

    sameDirs = true;

    positions.forEach(function (pos, i) {
      if (i == 0) {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if (piece instanceof GearBit) {
          if (piece.direction != firDir) {
            sameDirs = false;
          }
        }
      }
    })

    expect(sameDirs).toBeTruthy();
  })

  it('Should work out workout flipper', () => {
    const board = new Board(6);
    let marble = new Marble("blue");
    marble.position = new Pos(10, 0);

    board.workOutFlipperColour(marble);
    expect(board.blueMarbles.length == 5).toBeTruthy('Should have released a blue marble');

    marble.position = new Pos(10, 6);
    board.workOutFlipperColour(marble);
    expect(board.redMarbles.length == 5).toBeTruthy('Should have released a red marble');

    marble.position = new Pos(10, 5);
    expect(board.redMarbles.length == board.blueMarbles.length && board.blueMarbles.length == 5).toBeTruthy('No piece so shouldnt increase marble in either');

    board.slots[10][5].piece = new Ramp(Direction.left, new Pos(10, 5));
    board.workOutFlipperColour(marble);

    expect(board.blueMarbles.length == 4).toBeTruthy('Should have increased blue marbles');
  })

  it('should correctly use click piece', () => {
    const board = new Board(6);
    board.heldPiece = Piece.Ramp;

    board.clickPiece(new Pos(2, 5));
    expect(board.slots[2][5].piece.type == Piece.Ramp).toBeTruthy('A ramp should no be placed');
    board.clickPiece(new Pos(2, 5));
    expect((board.slots[2][5].piece as Ramp).direction == Direction.right).toBeTruthy('The direction should have changed after clicking the piece');

    board.heldPiece = Piece.Delete;
    board.clickPiece(new Pos(2, 5));
    expect(board.slots[2][5].piece).toBeFalsy('Piece should have been deleted');
  })

  it('Check example can be set', () => {
    const board = new Board(6);
    board.setExample(1);

    expect(board.slots[10][5].piece.type == Piece.Ramp).toBeTruthy('Should have a ramp in the bottom slot');
  })
});
