import { Gear } from '../boardPieces/gear';
import {Slot} from './slot'

export class Pin implements Slot{
    partName:String = "Pin";
    holdingGear:Gear;

    constructor(){
        this.holdingGear = null;
    }
}
