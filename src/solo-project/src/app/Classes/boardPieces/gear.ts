import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Gear extends BoardPiece {
    position: Pos;
    imgLink: string = "assets/gear.svg";
    imgBlueMarble = this.imgLink;
    imgRedMarble = this.imgLink;
    type = Piece.Gear;
    info = "Flip the direction of any connected GearBits";

    constructor(position: Pos) {
        super(position);
    }

    processMarble(marble: Marble) {
        marble.direction = Direction.stopped;
        marble.position.x = -5;
        marble.position.y = -5;
    }

    click() {
        console.log("Gear clicked");
    }

}
