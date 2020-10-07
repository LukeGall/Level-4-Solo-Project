import { Slot } from './slot';

export class Board {
    slots: Slot[][];

    constructor(noOfRows:number, noOfCols){
        this.slots = new Array<Array<Slot>>();
    }
}
