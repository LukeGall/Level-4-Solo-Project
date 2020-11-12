import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import { Board } from './boardParts/board';
import { Direction } from './boardParts/direction';
import { Pos } from './boardParts/pos';
import { Gear } from './boardPieces/gear';
import { GearBit } from './boardPieces/gear-bit';

describe('BoardServiceService', () => {
  let service: BoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should let me access the board', ()=>{
    let board:Board;
    service.getBoard().subscribe(
      b => {board = b}
    );
    expect(board).toBeTruthy();
  })

  it('Should let me set the piece thats being held',()=>{
    let heldPiece:String;
    service.getHeldPiece().subscribe(
      piece => {heldPiece = piece}
    );
    service.setHolding("test");
    expect(heldPiece == "test").toBeTruthy();
  })

  it('Should allow the marbles to increase and decrease',()=>{
    let board: Board;
    service.getBoard().subscribe(
      b => {board = b}
    );
    expect(board.blueMarbles.length).toEqual(6);

    service.increaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(7);

    service.decreaseMarble("blue");
    service.decreaseMarble("blue");
    expect(board.blueMarbles.length).toEqual(5);
  })

  it('Should release marbles',()=>{
    let board: Board;
    service.getBoard().subscribe(
      b => {board = b}
    );
    expect(service.startMarble("blue"))
    expect(board.inPlayMarble).toBeTruthy();
  })

  it('Should change gears to same direction when connected', ()=>{
    let board: Board;
    const positions: Pos[] = [new Pos(2,1),new Pos(2,3), new Pos(2,5)];
    service.getBoard().subscribe(
      b => {board = b}
    );
    board.slots[2][1].piece = new GearBit(Direction.right,positions[0]); 
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear();
    board.slots[2][4].piece = new Gear();
    service.newGearComp(new Pos(2,2));
    service.newGearComp(new Pos(2,4));

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
    let board: Board;
    const positions: Pos[] = [new Pos(2,1),new Pos(2,3), new Pos(2,5)];
    service.getBoard().subscribe(
      b => {board = b}
    );
    board.slots[2][1].piece = new GearBit(Direction.right,positions[0]); 
    board.slots[2][3].piece = new GearBit(Direction.left, positions[1]);
    board.slots[2][5].piece = new GearBit(Direction.right, positions[2]);

    board.slots[2][2].piece = new Gear();
    board.slots[2][4].piece = new Gear();
    service.newGearComp(new Pos(2,2));
    service.newGearComp(new Pos(2,4));

    // first spin

    service.gearSpin(positions[0]);

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
    service.gearSpin(positions[0]);
    
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
