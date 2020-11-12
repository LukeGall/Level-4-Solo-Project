import { Direction } from './direction';
import { Marble } from './marble';

describe('Marble', () => {
    it('should create an instance', () => {
        expect(new Marble("blue")).toBeTruthy();
    });

    it('should have the directions correct', () => {
        expect((new Marble("blue")).direction).toEqual(Direction.right);
        expect((new Marble("red")).direction).toEqual(Direction.left);
    })
});
