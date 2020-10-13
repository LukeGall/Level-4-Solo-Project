import { Direction } from './direction';

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


class Pos{
    x : number;
    y: number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}