import { BoardPiece } from '../boardPieces/board-piece';
import { Marble } from './marble';
import { Pos } from './pos';
import { Slot } from './slot'

export class Dispenser implements Slot {
    partName: string = "Dispenser";
    piece: BoardPiece = null;
    position: Pos;
    colour: string;

    constructor(position: Pos, colour: string) {
        this.position = position;
        this.colour = colour;
    }

    outputMarble(): Marble{
        const marble = new Marble(this.colour);
        marble.position = new Pos(this.position.x +1, this.position.y);
        return marble;
    }
}
