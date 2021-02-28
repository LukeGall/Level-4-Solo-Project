import { CompSlot } from '../Classes/boardParts/comp-slot';
import { Direction } from '../Classes/boardParts/direction';
import { Pin } from '../Classes/boardParts/pin';
import { Pos } from '../Classes/boardParts/pos';
import { Slot } from '../Classes/boardParts/slot';
import { Bit } from '../Classes/boardPieces/bit';
import { Crossover } from '../Classes/boardPieces/crossover';
import { Gear } from '../Classes/boardPieces/gear';
import { GearBit } from '../Classes/boardPieces/gear-bit';
import { Interceptor } from '../Classes/boardPieces/interceptor';
import { Ramp } from '../Classes/boardPieces/ramp';
import { parseSlotString, slotsToString } from './convert-functions';


describe('Convert Functions', () => {
    let slots: Slot[][];

    beforeEach(() => {
        slots = new Array<Array<Slot>>();
        slots.push(new Array<Slot>());

        slots[0].push(new CompSlot());
        slots[0].push(new Pin());
        for (var i = 0; i < 10; i++) {
            slots[0].push(new CompSlot());
        }

        slots[0][2].piece = new Ramp(Direction.left, new Pos(0,2));
        slots[0][3].piece = new Interceptor(new Pos(0,3));
        slots[0][4].piece = new Bit(Direction.right, new Pos(0,4));
        slots[0][5].piece = new Gear(new Pos(0,5));
        slots[0][6].piece = new Crossover(new Pos(0,6));
        slots[0][7].piece = new GearBit(Direction.left, new Pos(0,7));
    })

    it('Should convert to correct string', () => {
        const str = slotsToString(slots);
        expect(str.includes('.')).toBeTrue();
        expect(str.includes(',')).toBeTrue();
        expect(str.includes('I')).toBeTrue();
        expect(str.includes('Rl')).toBeTrue();
        expect(str.includes('C')).toBeTrue();
        expect(str.includes('g')).toBeTrue();
        expect(str.includes('Gl')).toBeTrue();
        expect(str.includes('Br')).toBeTrue();
    })

    it('Should parse back to same slots', () => {
        const newSlots = parseSlotString(slotsToString(slots));
        expect(JSON.stringify(newSlots)).toEqual(JSON.stringify(slots));
    })
});