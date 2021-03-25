import { CompSlot } from "../Classes/boardParts/comp-slot";
import { Direction } from "../Classes/boardParts/direction";
import { Pin } from "../Classes/boardParts/pin";
import { Pos } from "../Classes/boardParts/pos";
import { Slot } from "../Classes/boardParts/slot";
import { Bit } from "../Classes/boardPieces/bit";
import { Crossover } from "../Classes/boardPieces/crossover";
import { Gear } from "../Classes/boardPieces/gear";
import { GearBit } from "../Classes/boardPieces/gear-bit";
import { Interceptor } from "../Classes/boardPieces/interceptor";
import { Ramp } from "../Classes/boardPieces/ramp";
import { Piece } from "../Classes/piece.enum";

export function slotsToString(boardSlots: Slot[][]): string {
  var slots = "";
  boardSlots.forEach((row) => {
    row.forEach((slot) => {
      if (!slot) {
        slots += " x";
      } else if (!slot.piece) {
        switch (slot.partName) {
          case "Pin":
            slots += " .";
            break;
          case "CompSlot":
            slots += " ,";
            break;
        }
      } else {
        switch (slot.piece.type) {
          case "Ramp":
            slots += " R";
            break;
          case "Gear":
            slots += " g";
            break;
          case "Bit":
            slots += " B";
            break;
          case "Crossover":
            slots += " C";
            break;
          case "GearBit":
            slots += " G";
            break;
          case "Interceptor":
            slots += " I";
            break;
        }
        if (slot.piece.type == Piece.Ramp || slot.piece.type == Piece.Bit || slot.piece.type == Piece.GearBit) {
          if (slot.piece.direction == Direction.left) {
            slots += "l";
          } else {
            slots += "r";
          }
        }
      }
    })
    slots += "\n";
  })

  return slots;
}

export function parseSlotString(slotString: string): Slot[][] {
  var slots = new Array<Array<Slot>>();


  slotString.split("\n").forEach(function (row, xPos) {
    if (row) {
      var slotRow = new Array<Slot>();
      var yPos = -1;

      row.split(" ").forEach((str) => {
        var slot: Slot;
        if (str) {
          yPos++;
          switch (str) {
            case ('x'):
              slotRow.push(null);
              break;
            case ('.'):
              slotRow.push(new Pin());
              break;
            case (','):
              slotRow.push(new CompSlot());
              break;
            case ('Rl'):
              slot = new CompSlot();
              slot.piece = new Ramp(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Rr'):
              slot = new CompSlot();
              slot.piece = new Ramp(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Bl'):
              slot = new CompSlot();
              slot.piece = new Bit(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Br'):
              slot = new CompSlot();
              slot.piece = new Bit(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Gl'):
              slot = new CompSlot();
              slot.piece = new GearBit(Direction.left, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('Gr'):
              slot = new CompSlot();
              slot.piece = new GearBit(Direction.right, new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('C'):
              slot = new CompSlot();
              slot.piece = new Crossover(new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('I'):
              slot = new CompSlot();
              slot.piece = new Interceptor(new Pos(xPos, yPos))
              slotRow.push(slot);
              break;
            case ('g'):
              slot = (xPos + yPos) % 2 != 0 ? new CompSlot() : new Pin();
              slot.piece = new Gear(new Pos(xPos, yPos));
              slotRow.push(slot);
              break;
            default:
              slot = (xPos + yPos) % 2 != 0 ? new CompSlot() : new Pin();
              slotRow.push(slot);
          }
        }
      })
      slots.push(slotRow);
    }
  })
  return slots
}