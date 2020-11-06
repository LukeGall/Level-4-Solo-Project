import { CompSlot } from './comp-slot';
import { Direction } from './direction';
import { Marble } from './marble';
import { MarblePair } from './marblePair';
import { Pin } from './pin';
import { Slot } from './slot';

export class Board {
    slots: Slot[][];
    blueMarbles: Marble[];
    redMarbles: Marble[];
    inPlayMarble: Marble;
    collectedMarbles: MarblePair[];

    constructor(numOfMarbles:number) {
        this.slots = new Array<Array<Slot>>();
        this.blueMarbles = new Array<Marble>();
        this.redMarbles = new Array<Marble>();
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();

        this.slots[0] = new Array<Slot>();
        this.slots[1] = new Array<Slot>();

        this.slots[0].push(null, null, new Pin(), new CompSlot(), new Pin(), null, new Pin(), new CompSlot(), new Pin(), null, null);
        this.slots[1].push(null, new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), null);

        for (var i = 2; i < 10; i++) {
            this.slots[i] = new Array<Slot>();
            for (var j = 0; j < 11; j++) {
                this.slots[i].push(((j + i) % 2 == 0) ? new Pin() : new CompSlot());
            }
        }

        this.slots[10] = new Array<Slot>();
        this.slots[10].push(null, null, null, null, new Pin(), new CompSlot(), new Pin(), null, null, null, null);

        // Add the marbles
        for (i = 0; i < numOfMarbles; i++) {
            this.blueMarbles.push(new Marble("blue"))
            this.redMarbles.push(new Marble("red"))
        }
    }

    clearOfPieces(){
        for(var i = 0; i <10; i++){
            for(var j = 0; j <10; j++){
                if(this.slots[i][j]){
                    this.slots[i][j].piece = null;
                }
            }
        }
    }
}
