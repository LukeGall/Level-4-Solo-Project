import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class GearBit extends BoardPiece {
    direction: Direction;
    position: Pos;
    type = Piece.GearBit;
    
    constructor(direction: Direction, position: Pos) {
        super(position);
        this.direction = direction;
    }

    switchDirection() {
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }

    processMarble(marble: Marble): any[] {
        marble.position.x += 1;
        marble.position.y -= this.direction;
        this.switchDirection();
        marble.direction = this.direction;

        let newPiece = new GearBit(null,null);
        let newMarble = new Marble();
        Object.assign(newMarble, marble);
        Object.assign(newPiece, this);

        return [newPiece, newMarble];
    }

    click() {
        this.switchDirection();
    }
}
