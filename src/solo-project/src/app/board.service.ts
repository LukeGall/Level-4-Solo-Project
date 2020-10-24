import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from './boardParts/board';
import { CompSlot } from './boardParts/comp-slot';
import { Direction } from './boardParts/direction';
import { Marble } from './boardParts/marble';
import { Pos } from './boardParts/pos';
import { Slot } from './boardParts/slot';
import { Gear } from './boardPieces/gear';
import { GearBit } from './boardPieces/gear-bit';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  // Board slots is an array of 11 by 11 
  board: Board = new Board(6);
  heldPiece: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  inPlayMarble: BehaviorSubject<Marble> = new BehaviorSubject<Marble>(null);
  private inPlay: boolean = true;
  private speedInMs: number = 1000;

  getBoard(): Observable<Board> {
    return of(this.board);
  }

  setHolding(type: String) {
    this.heldPiece.next(type);
  }

  getHeldPiece(): BehaviorSubject<String> {
    return this.heldPiece;
  }

  getInPlayMarble(): BehaviorSubject<Marble> {
    return this.inPlayMarble;
  }

  startMarble(colour: String) {
    this.releaseMarble(colour);
    
    console.log(this.board.inPlayMarble)
    this.inPlay = true;
    this.play();
  }

  private releaseMarble(colour: String) {
    if (colour == "blue") {
      this.board.inPlayMarble = this.board.blueMarbles.pop()
    } else {
      this.board.inPlayMarble = this.board.redMarbles.pop()
    }
    this.inPlayMarble.next(this.board.inPlayMarble);
  }

  stepForward() {
    this.inPlay = false;
    if (this.board.inPlayMarble) {
      this.dropMarble()
    }
  }

  toggle() {
    if(this.inPlay){
      this.inPlay=false;
    } else {
      this.inPlay = true;
      this.play();
    }
  }

  setSpeed(newSpeed: number) {
    this.speedInMs = newSpeed;
  }

  private async play() {
    while (this.board.inPlayMarble && this.inPlay) {
      // Ensure that the first dropped marble doesn't instantly go to it's next position
      await this.sleep();
      this.dropMarble();
    }
  }

  private sleep() {
    return new Promise(resolve => setTimeout(resolve, this.speedInMs));
  }

  private dropMarble() {
    let marble = this.board.inPlayMarble;
    if (marble != undefined) {
      // marble is in play when the pos.x and y is >=0 and <= 11 it is in play
      // Then check the component in the compSlot if not compSlot then fall(). If compslot there then call that compoents process Marble and it should update the position
      // if it gets to x = 11 then decide what flipper it will trigger or if middle use that to decide trigger as well.
      if (this.marbleInBounds(marble.position) && marble.direction != Direction.stopped) {
        let slot = this.board.slots[marble.position.x][marble.position.y];
        console.log(marble.position.x)
        console.log(marble.direction)

        if (slot instanceof CompSlot) {
          if (slot.piece != null) {
            console.log(slot.piece.getName())
            let oldPos = new Pos(marble.position.x, marble.position.y);
            slot.piece.processMarble(marble);
            if (slot.piece instanceof GearBit) {
              console.log("Hello")
              this.gearSpin(oldPos);
            }
          } else {
            this.marbleFall(marble);
            return;
          }
        }
      }
      else if (marble.direction != Direction.stopped) {
        this.workOutFlipperColour(marble);
      }
    }
  }


  private marbleInBounds(position: Pos): boolean {
    return (position.x >= 0 && position.x < 10 && position.y >= 0 && position.y <= 10)
  }

  private marbleFall(marble: Marble) {
    // Update marble to fall on screen
    this.board.inPlayMarble = null;
    this.inPlayMarble.next(this.board.inPlayMarble);
    this.inPlay = false;
    console.log("Marble has fallen");
  }

  private workOutFlipperColour(marble: Marble) {
    // Maybe split into another function which calcs the last slot?
    if (marble.position.x == 10 && marble.position.y == 5 && this.board.slots[10][5].piece) {
      this.board.slots[10][5].piece.processMarble(marble);
    }

    let posY = marble.position.y;
    if (posY >= 0 && posY < 5) {
      this.board.collectedMarbles.push(marble);
      this.releaseMarble("blue");
    } else if (posY > 5 && posY <= 10) {
      this.board.collectedMarbles.push(marble);
      this.releaseMarble("red");
    } else {
      this.marbleFall(marble);
    }
  }

  newGearComp(position: Pos) {
    // Will decide if this gear bit needs to change direction
    let visitedPos = new Set<String>();
    let acceptedPos = new Set<Slot>();
    this.getSetOfJoining(position, visitedPos, acceptedPos);
    console.log(visitedPos);
    console.log(acceptedPos);

    if (acceptedPos.size > 1) {
      var firstEle: boolean = true;
      var dirForGbs: Direction;

      for (var it = acceptedPos.values(), val: Slot = null; val = it.next().value;) {
        if (firstEle) {
          firstEle = false;
          if (val.piece instanceof GearBit) dirForGbs = val.piece.direction;
        } else {
          val.piece = (dirForGbs == Direction.left) ? new GearBit(Direction.left, val.piece.position) : new GearBit(Direction.right, val.piece.position);
        }
      }
    }
  }

  gearSpin(position: Pos) {
    // Will check what neighboring gears will need to spin also
    console.log("GearSpin called");
    console.log(position);
    let visitedPos = new Set<String>();
    let acceptedPos = new Set<Slot>();
    this.getSetOfJoining(position, visitedPos, acceptedPos);

    var firstEle: boolean = true;
    var dirForGbs: Direction;

    for (var it = acceptedPos.values(), val: Slot = null; val = it.next().value;) {
      if (firstEle) {
        firstEle = false;
        if (val.piece instanceof GearBit) dirForGbs = val.piece.direction;
      } else {
        val.piece = (dirForGbs == Direction.left) ? new GearBit(Direction.left, val.piece.position) : new GearBit(Direction.right, val.piece.position);
      }
    }
    console.log(dirForGbs);

  }

  private getSetOfJoining(position: Pos, setVisited: Set<String>, setAccepted: Set<Slot>) {
    console.log("startOfJoin");
    setVisited.add(JSON.stringify(position));

    let xPos = position.x;
    let yPos = position.y;

    let slot = this.board.slots[xPos][yPos]
    let connections = [new Pos(xPos - 1, yPos), new Pos(xPos + 1, yPos), new Pos(xPos, yPos - 1), new Pos(xPos, yPos + 1)];
    if (slot) {
      if (slot.piece instanceof Gear) {
        // console.log("found gear")
        connections.forEach(pos => {
          if (this.marbleInBounds(pos) && !setVisited.has(JSON.stringify(pos))) {
            this.getSetOfJoining(pos, setVisited, setAccepted);
          }
        })
      } else if (slot.piece instanceof GearBit) {
        setAccepted.add(slot);
        connections.forEach(pos => {
          if (this.marbleInBounds(pos) && !setVisited.has(JSON.stringify(pos))) {
            this.getSetOfJoining(pos, setVisited, setAccepted);
          }
        })
      }
    }
  }
}

// MAKE IT MORE READABLE with variable names