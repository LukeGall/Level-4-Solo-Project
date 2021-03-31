import { Pipe, PipeTransform } from '@angular/core';
import { Pos } from './boardParts/pos';

@Pipe({ name: 'slotBackground' })
// Used in the interactive tutorial to add slot highlighting 
export class SlotBackgroundPipe implements PipeTransform {
    transform(state: number, x: number, y: number): boolean {
        switch (state) {
            case 1:
            case 2:
            case 3:
            case 10:
            case 12:
                if (x == 0 && y == 3) return true;
                break;
            case 4:
                return this.posInArray(this.case4Pos,x,y);
            case 7:
                return this.posInArray(this.case7Pos,x,y);
            case 8:
                return this.posInArray(this.case8Pos,x,y);
            case 9:
                return this.posInArray(this.case9Pos,x,y);
            case 11:
                if (x==1 && y==4) return true;
                break;
            case 13:
                return this.posInArray(this.case13Pos,x,y);
            case 14:
                return this.posInArray(this.case14Pos,x,y);
            case 16:
                return this.posInArray(this.case16Pos,x,y);
            default:
                return false;
        }
    }

    private posInArray(posArray: Pos[], x: number, y:number): boolean{
        for(let i=0; i<posArray.length;i++){
            const pos = posArray[i];
            if(pos.x == x && pos.y ==y) return true;
            if(pos.x>x) return false;
        }
        return false;
    }

    case4Pos: Pos[] = [new Pos(0, 3), new Pos(1, 2), new Pos(2, 3), new Pos(3, 2), new Pos(4, 3), new Pos(5, 2), new Pos(6, 3), new Pos(7, 2), new Pos(8, 3), new Pos(9, 2)];
    case7Pos: Pos[] = [new Pos(2,5),new Pos(4,5), new Pos(6,5), new Pos(8,5),new Pos(10,5)];
    case8Pos: Pos[] = [new Pos(0,3), new Pos(0,7), new Pos(1,4), new Pos(1,6), new Pos(3,4), new Pos(3,6), new Pos(5,4), new Pos(5,6), new Pos(7,4), new Pos(7,6), new Pos(9,4), new Pos(9,6)];
    case9Pos: Pos[] = [new Pos(1,4), new Pos(2,3), new Pos(2,5), new Pos(3,2), new Pos(3,4), new Pos(3,6)];
    case13Pos: Pos[] = [new Pos(2,1), new Pos(2,3), new Pos(2,5), new Pos(3,2), new Pos(3,4)];
    case14Pos: Pos[] = [new Pos(2,2), new Pos(2,4), new Pos(3,3)];
    case16Pos: Pos[] = [new Pos(0,3), new Pos(1,2)];
}