import { CompSlot } from '../boardParts/comp-slot';
import { Direction } from '../boardParts/direction';
import { Pin } from '../boardParts/pin';
import { Pos } from '../boardParts/pos';
import { Slot } from '../boardParts/slot';
import { Bit } from '../boardPieces/bit';
import { Interceptor } from '../boardPieces/interceptor';
import { Ramp } from '../boardPieces/ramp';

export class Example2 {
    static slots: Slot[][] = new Array<Array<Slot>>();


    static getSlots(): Slot[][] {
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

        this.slots[0][3].piece = new Bit(Direction.left, new Pos(0, 3));
        this.slots[2][3].piece = new Bit(Direction.left, new Pos(2, 3));
        this.slots[4][3].piece = new Bit(Direction.left, new Pos(4, 3));
        this.slots[6][3].piece = new Bit(Direction.left, new Pos(6, 3));

        this.slots[1][2].piece = new Ramp(Direction.right, new Pos(1, 2));
        this.slots[3][2].piece = new Ramp(Direction.right, new Pos(3, 2));
        this.slots[5][2].piece = new Ramp(Direction.right, new Pos(5, 2));
        this.slots[7][2].piece = new Ramp(Direction.right, new Pos(7, 2));

        this.slots[1][4].piece = new Ramp(Direction.right, new Pos(1, 4));
        this.slots[3][4].piece = new Ramp(Direction.right, new Pos(3, 4));
        this.slots[5][4].piece = new Ramp(Direction.right, new Pos(5, 4));
        this.slots[7][4].piece = new Interceptor(new Pos(7, 4));

        this.slots[2][5].piece = new Ramp(Direction.left, new Pos(2, 5));
        this.slots[4][5].piece = new Ramp(Direction.left, new Pos(4, 5));
        this.slots[6][5].piece = new Ramp(Direction.right, new Pos(6, 5));

        this.slots[7][2].piece = new Ramp(Direction.right, new Pos(7, 2));
        this.slots[7][6].piece = new Ramp(Direction.left, new Pos(7, 6));
        this.slots[8][3].piece = new Ramp(Direction.right, new Pos(8, 3));
        this.slots[8][5].piece = new Ramp(Direction.left, new Pos(8, 5));
        this.slots[9][4].piece = new Ramp(Direction.left, new Pos(9, 4));


        return this.slots;
    }

}
