import { Gear } from '../boardPieces/gear';
import { GearBit } from '../boardPieces/gear-bit';
import { Ramp } from '../boardPieces/ramp';
import { Board } from './board';
import { Direction } from './direction';
import { Pos } from './pos';

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

  it('Should allow the marbles to increase and decrease',()=>{
    let board: Board = new Board(6);
    expect(board.blueMarbles.length).toEqual(6);

    board.increaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(7);

    board.decreaseMarble("blue");
    board.decreaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(5);
  })

  it('Should release marbles',()=>{
    let board: Board = new Board(6);

    expect(board.startMarble("blue"))
    expect(board.inPlayMarble).toBeTruthy();
  })

  it('Should change gears to same direction when connected', ()=>{
    let board: Board = new Board(6);
    const positions: Pos[] = [new Pos(2,1),new Pos(2,3), new Pos(2,5)];
    
    board.slots[2][1].piece = new GearBit(Direction.right,positions[0]); 
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear(new Pos(2,2));
    board.slots[2][4].piece = new Gear(new Pos(2,4));
    board.newGearComp(new Pos(2,2));
    board.newGearComp(new Pos(2,4));

    let firDir: Direction;
    let sameDirs: boolean = true;

    positions.forEach(function (pos, i) {
      if(i==0){
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) {
          if(piece.direction != firDir){
            sameDirs = false;
          }
        }
      }
    })

    expect(sameDirs).toBeTruthy();
  })

  it('Should make connected gears change directions together', ()=>{
    let board: Board = new Board(6);
    const positions: Pos[] = [new Pos(2,1),new Pos(2,3), new Pos(2,5)];
    
    board.slots[2][1].piece = new GearBit(Direction.right,positions[0]); 
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear(new Pos(2,2));
    board.slots[2][4].piece = new Gear(new Pos(2,4));
    board.newGearComp(new Pos(2,2));
    board.newGearComp(new Pos(2,4));

    // first spin

    board.gearSpin(positions[0]);

    let firDir: Direction;
    let sameDirs: boolean = true;

    positions.forEach(function (pos, i) {
      if(i==0){
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) {
          if(piece.direction != firDir){
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
      if(i==0){
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) firDir = piece.direction;
      } else {
        const piece = board.slots[pos.x][pos.y].piece;
        if(piece instanceof GearBit) {
          if(piece.direction != firDir){
            sameDirs = false;
          }
        }
      }
    })

    expect(sameDirs).toBeTruthy();
  })
});
