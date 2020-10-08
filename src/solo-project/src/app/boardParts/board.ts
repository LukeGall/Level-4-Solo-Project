import { Slot } from './slot';

export class Board {
    slots: Slot[][];

    constructor(){
        this.slots = new Array<Array<Slot>>();
    }
}
