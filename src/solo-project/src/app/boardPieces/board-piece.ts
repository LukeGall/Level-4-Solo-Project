import { Marble } from '../boardParts/marble';

export interface BoardPiece {
    getName():String;
    processMarble(marble: Marble);
}
