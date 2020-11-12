import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Crossover extends BoardPiece {
    imgLink: String = "Not set";
    inPlayMarble: Marble;
    position: Pos;

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += marble.direction;
    }

    getTxtDisplay(): String {
        return "CO";
    }

    constructor(pos: Pos) {
        super(pos);
    }

    
    click() {
        console.log("Crossover clicked");
    }
}
