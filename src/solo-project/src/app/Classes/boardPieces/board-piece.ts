import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';

export class BoardPiece {
    getTxtDisplay(): string {
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
    
    lock(){
        this.locked = true;
    }

    imgLink: string;
    imgBlueMarble: string;
    imgRedMarble: string;
    
    position: Pos = null;
    type:Piece = null;
    locked: boolean=false;
    info:string;
}
