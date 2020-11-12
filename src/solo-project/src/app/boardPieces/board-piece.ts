import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';

export class BoardPiece {
    getTxtDisplay(): String {
        return "Not Implemented";
    };

    processMarble(marble: Marble) { };

    click() { };

    ifMarble(marble:Marble): boolean {
        if (marble) {
            if (marble.position.x == this.position.x && marble.position.y == this.position.y)
                return true;
        }
        return false;
    };

    constructor(pos:Pos) {
        this.position = pos;
        if(this.constructor === BoardPiece){
            throw new TypeError('This is an abstract class, can not instantiate directly.');
        }
    }

    imgLink: String;
    position: Pos;
}
