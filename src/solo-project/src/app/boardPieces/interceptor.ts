import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Interceptor implements BoardPiece{
    ProcessMarble(marble: Marble) {
        throw new Error('Method not implemented.');
    }
    getName(): String {
        return "Interceptor";
    }
}
