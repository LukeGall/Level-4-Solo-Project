import { Direction } from './direction';
import { Pos } from './pos';

export class Marble {
    direction: Direction;
    colour: String;
    position: Pos;
    imgLink:String;

    constructor(colour:String){
        this.colour = colour;
        if(colour == "blue"){
            this.direction = Direction.right;
            this.position = new Pos(0,3);
            this.imgLink = "../../../assets/blue-marble.svg";
        } else {
            this.direction = Direction.left;
            this.position = new Pos(0,7);
            this.imgLink = "../../../assets/red-marble.svg";
        }
    }
}


