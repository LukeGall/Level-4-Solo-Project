import { Injectable } from '@angular/core';
import { Piece } from '../Classes/piece.enum';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor() { }

  getPieceImg(piece: string): string{
    if(piece){
      if(piece == Piece.GearBit) return "assets/gear-bit.svg";
      return "assets/"+piece.toLowerCase()+".svg";
    }
  }
}
