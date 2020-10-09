import { BoardPiece } from './board-piece';

export class Interceptor implements BoardPiece{
    getName(): String {
        return "Interceptor";
    }
}
