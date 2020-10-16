import { Direction } from './direction';
import { Pos } from './pos';

export class Marble {
    direction: Direction;
    colour: String;
    position: Pos;

    constructor(colour:String, direction: Direction, x:number, y:number){
        this.colour = colour;
        this.direction = direction;
        this.position = new Pos(x,y);
    }
}


