import { Board } from './boardParts/board';
import { Slot } from './boardParts/slot';

export class PuzzleBoard extends Board{
    private startingSlots: Slot[][];
    private solutionSlot: Slot[][];
    
    constructor(){
        super(6);
    }
}
