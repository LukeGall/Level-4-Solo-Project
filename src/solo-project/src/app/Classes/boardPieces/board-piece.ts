import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';

export class BoardPiece {
    position: Pos = null;
    type: Piece = null;
    locked: boolean = false;
    direction?: Direction;

    constructor(pos: Pos) {
        this.position = pos;
        if (this.constructor === BoardPiece) {
            throw new TypeError('This is an abstract class, can not instantiate directly.');
        }
    }

    processMarble(marble: Marble): any[] { return null };

    click():boolean {return false};

    ifMarble(marble: Marble): boolean {
        if (marble) {
            if (marble.position.x == this.position.x && marble.position.y == this.position.y)
                return true;
        }
        return false;
    };

    lock() {
        this.locked = true;
    }
}
