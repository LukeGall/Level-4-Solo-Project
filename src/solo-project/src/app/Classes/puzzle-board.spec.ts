import { Direction } from './boardParts/direction';
import { Pos } from './boardParts/pos';
import { Ramp } from './boardPieces/ramp';
import { Piece } from './piece.enum';
import { boardState, PuzzleBoard } from './puzzle-board';

describe('PuzzleBoard', () => {
  let board: PuzzleBoard;

  beforeEach(() => {
    board = new PuzzleBoard();
  })

  it('should create an instance', () => {
    expect(new PuzzleBoard()).toBeTruthy();
  });


  it('should create puzzle board with its board pieces', () => {
    (board.boardPieces as Map<Piece, number>).forEach(item => {
      expect(item == 0).toBeTruthy('Should be 0 to start with');
    }
    )
  })

  it('Should only let you increase the marble if editing', () => {
    board.boardState = boardState.starting;
    expect(board.blueMarbles.length == 0).toBeTruthy();
    board.increaseMarble('blue')
    expect(board.blueMarbles.length == 1).toBeTruthy();

    board.boardState = boardState.playing;
    board.increaseMarble('blue');
    expect(board.blueMarbles.length == 2).toBeFalsy('Shouldnt increase as its in the playing state');
  })


  it('Should lock in the starting slots that have been made', () => {
    board.slots[2][5].piece = new Ramp(Direction.left, new Pos(2, 5));
    board.confirmedStartingSlots();

    expect(board.slots[2][5].piece.locked).toBeTruthy('Should be a locked starting piece')
    expect(JSON.stringify(board.slots) == JSON.stringify(board.startingSlots)).toBeTruthy('Starting slots should now be set');
  })

  it('Should show answer correctly', () => {
    board.slots[2][5].piece = new Ramp(Direction.left, new Pos(2, 5));
    board.confirmedStartingSlots();

    board.slots[2][7].piece = new Ramp(Direction.left, null);
    board.confirmBoard();

    board.resetBoard();
    expect(board.slots[2][7].piece).toBeFalsy('Should have been cleared')

    board.showAnswer();
    expect(board.slots[2][7].piece).toBeTruthy('Should now be set to the board');
  })

  it('should clear the board pieces correctly', () => {
    board.slots[2][5].piece = new Ramp(Direction.left, new Pos(2, 5));
    board.confirmedStartingSlots();

    board.heldPiece = Piece.Ramp;
    board.clickPiece(new Pos(2, 7));

    expect(board.boardPieces.get(Piece.Ramp) == 1).toBeTruthy('Should have added ramp board pieces')

    board.resetBoard();
    expect(board.boardPieces.get(Piece.Ramp) == 0).toBeTruthy('Should have cleared the pieces used');


    board.clickPiece(new Pos(2, 7));
    board.confirmBoard();
    board.heldPiece = Piece.Ramp;
    board.clickPiece(new Pos(2, 7));
    expect(JSON.stringify(board.slots) != JSON.stringify(board.startingSlots)).toBeTruthy('Shouldnt equal starting slots');
    board.resetBoard();
    expect(JSON.stringify(board.startingSlots) == JSON.stringify(board.slots)).toBeTruthy('Should reset to starting slots');

  })

  it('should reset the starting marbles', () => {
    board.confirmedStartingSlots();
    board.increaseMarble('blue');
    board.increaseMarble('blue');
    board.increaseMarble('blue');

    board.confirmBoard();

    board.startMarble('blue');
    expect(board.blueMarbles.length == 2).toBeTruthy();
    board.clearMarbles();
    expect(board.blueMarbles.length == 3).toBeTruthy('Should go back to starting amount');
  })

  it('should click pieces correctly when making solution', () => {
    board.slots[2][5].piece = new Ramp(Direction.left, null);
    board.confirmedStartingSlots();

    board.heldPiece = Piece.Ramp;
    expect(board.clickPiece(new Pos(2, 5))).toBeFalsy('Shouldnt change locked piece');

    board.clickPiece(new Pos(2, 7));
    expect(board.boardPieces.get(Piece.Ramp) == 1).toBeTruthy('Should update board pieces');

    board.heldPiece = Piece.Bit;
    board.clickPiece(new Pos(2, 7));
    expect(board.boardPieces.get(Piece.Ramp) == 0).toBeTruthy('Should reduce amount of ramps needed');
  })

  it('should click pieces correctly when playing puzzle', () => {
    board.heldPiece = Piece.Ramp;
    board.clickPiece(new Pos(2, 5));
    board.confirmedStartingSlots();

    board.clickPiece(new Pos(2, 7));
    board.clickPiece(new Pos(3, 4));
    board.clickPiece(new Pos(2, 9));

    board.confirmBoard();

    expect(board.clickPiece(new Pos(2, 5))).toBeFalsy('Shouldnt change starting piece');

    board.heldPiece = Piece.Ramp;
    board.clickPiece(new Pos(3, 6));
    expect(board.boardPieces.get(Piece.Ramp)).toEqual(2, 'Should reduce number of Ramps');

    board.heldPiece = Piece.Delete;
    board.clickPiece(new Pos(3, 6));
    expect(board.boardPieces.get(Piece.Ramp) == 3).toBeTruthy('Should increase number of Ramps');

    board.heldPiece = Piece.Ramp;
    board.clickPiece(new Pos(3, 4));
    board.clickPiece(new Pos(3, 6));
    board.clickPiece(new Pos(3, 8));
    expect(board.boardPieces.get(Piece.Ramp) == 0).toBeTruthy('Zero ramps to place now');

    expect(board.clickPiece(new Pos(5, 2))).toBeFalsy('Shouldnt be able to place a new piece');


  })

});
