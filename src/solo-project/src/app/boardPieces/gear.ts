import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Gear extends BoardPiece{
    position: Pos;
    imgLink: String;
    type="Gear"
    processMarble(marble: Marble) {
        throw new Error('Gear cant process a marble');
    }
    
    constructor(position: Pos){
        super(position);
    }

    getTxtDisplay(): String {
        return "G";
    }

    click() {
        console.log("Gear clicked");
    }

}
