import { cloneDeep } from 'lodash';
import { Bit } from '../boardPieces/bit';
import { BoardPiece } from '../boardPieces/board-piece';
import { Crossover } from '../boardPieces/crossover';
import { Gear } from '../boardPieces/gear';
import { GearBit } from '../boardPieces/gear-bit';
import { Interceptor } from '../boardPieces/interceptor';
import { Ramp } from '../boardPieces/ramp';
import { Example1 } from '../exampleBoards/example1';
import { Example2 } from '../exampleBoards/example2';
import { Example3 } from '../exampleBoards/example3';
import { Example4 } from '../exampleBoards/example4';
import { Piece } from '../piece.enum';
import { CompSlot } from './comp-slot';
import { Direction } from './direction';
import { Marble } from './marble';
import { MarblePair } from './marblePair';
import { Pin } from './pin';
import { Pos } from './pos';
import { Slot } from './slot';

export class Board {
    slots: Slot[][] = new Array<Array<Slot>>();
    blueMarbles: Marble[] = new Array<Marble>();
    redMarbles: Marble[] = new Array<Marble>();
    inPlayMarble: Marble = null;
    collectedMarbles: MarblePair[] = new Array<MarblePair>();
    boardPieces: any = new Map([[Piece.Ramp, -1], [Piece.Gear, -1], [Piece.Bit, -1], [Piece.Crossover, -1], [Piece.GearBit, -1], [Piece.Interceptor, -1]]);
    private intercepted: boolean = false;

    heldPiece: Piece = null;
    inPlay: boolean = false;
    private playLock: boolean = true;
    private speedInMs: number = 1000;

    constructor(numOfMarbles: number) {
        this.slots[0] = new Array<Slot>();
        this.slots[1] = new Array<Slot>();

        this.slots[0].push(null, null, new Pin(), new CompSlot(), new Pin(), null, new Pin(), new CompSlot(), new Pin(), null, null);
        this.slots[1].push(null, new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), null);

        for (var i = 2; i < 10; i++) {
            this.slots[i] = new Array<Slot>();
            for (var j = 0; j < 11; j++) {
                this.slots[i].push(((j + i) % 2 == 0) ? new Pin() : new CompSlot());
            }
        }

        this.slots[10] = new Array<Slot>();
        this.slots[10].push(null, null, null, null, new Pin(), new CompSlot(), new Pin(), null, null, null, null);

        // Add the marbles
        for (i = 0; i < numOfMarbles; i++) {
            this.blueMarbles.push(new Marble("blue"))
            this.redMarbles.push(new Marble("red"))
        }
    }

    clearPieces() {
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();
        for (var i = 0; i < this.slots.length; i++) {
            for (var j = 0; j < this.slots[0].length; j++) {
                if (this.slots[i][j]) {
                    this.slots[i][j].piece = null;
                }
            }
        }
    }

    setHeldPiece(piece: Piece) {
        this.heldPiece = (piece);
    }


    increaseMarble(colour: string) {
        if (colour == "blue") {
            this.blueMarbles.push(new Marble("blue"))
        } else {
            this.redMarbles.push(new Marble("red"))
        }
    }

    decreaseMarble(colour: string) {
        if (colour == "blue") {
            this.blueMarbles.pop();
        } else {
            this.redMarbles.pop();
        }
    }

    startMarble(colour: string) {
        if (!this.inPlay) {
            // if (this.inPlayMarble == null) {
            this.releaseMarble(colour);

            this.inPlay = true;
            this.play();
        }
    }

    private releaseMarble(colour: string) {
        if (colour == "blue") {
            this.inPlayMarble = this.blueMarbles.pop()
        } else {
            this.inPlayMarble = this.redMarbles.pop()
        }
    }

    stepForward() {
        this.inPlay = false;
        if (this.inPlayMarble) {
            this.dropMarble()
        }
    }

    toggle() {
        if (this.inPlay) {
            this.inPlay = false;
        } else {
            this.inPlay = true;
            this.play();
        }
    }

    setSpeed(newSpeed: number) {
        this.speedInMs = newSpeed;
    }

    private async play() {
        if (this.playLock) {
            this.playLock = false;
            await this.sleep();
            while (this.inPlayMarble && this.inPlay) {
                // Ensure that the first dropped marble doesn't instantly go to it's next position
                this.dropMarble();
                await this.sleep();
            }
            this.playLock = true;
        }
    }

    private sleep() {
        return new Promise(resolve => setTimeout(resolve, this.speedInMs));
    }

    private dropMarble() {
        let marble = this.inPlayMarble;
        if (marble != undefined) {
            // marble is in play when the pos.x and y is >=0 and <= 11 it is in play
            // Then check the component in the compSlot if not compSlot then fall(). If compslot there then call that compoents process Marble and it should update the position
            // if it gets to x = 11 then decide what flipper it will trigger or if middle use that to decide trigger as well.
            if (this.marbleInBounds(marble.position) && marble.direction != Direction.stopped) {
                let slot = this.slots[marble.position.x][marble.position.y];
                console.log(marble.position.x)
                console.log(marble.direction)

                if (slot instanceof CompSlot) {
                    if (slot.piece && !(slot.piece instanceof Gear)) {
                        let oldPos = new Pos(marble.position.x, marble.position.y);
                        slot.piece.processMarble(marble);
                        if (slot.piece instanceof GearBit) {
                            this.gearSpin(oldPos);
                        }
                    } else {
                        this.marbleFall();
                        return;
                    }
                }
            }
            else if (marble.direction != Direction.stopped) {
                this.workOutFlipperColour(marble);
            } else {
                this.intercepted = true;
                this.inPlay = false;
                console.log("intercepted")
            }
        }
    }

    private marbleInBounds(position: Pos): boolean {
        return (position.x >= 0 && position.x < 10 && position.y >= 0 && position.y <= 10)
    }

    private marbleFall() {
        this.inPlayMarble = null;
        this.inPlay = false;
        console.log("Marble has fallen");
    }

    private workOutFlipperColour(marble: Marble) {
        if (marble.position.x == 10 && marble.position.y == 5 && this.slots[10][5].piece) {
            this.slots[10][5].piece.processMarble(marble);
        }

        let posY = marble.position.y;
        if (posY >= 0 && posY < 5) {
            this.updateList(marble);
            this.releaseMarble("blue");
        } else if (posY > 5 && posY <= 10) {
            this.updateList(marble);
            this.releaseMarble("red");
        } else {
            this.marbleFall();
        }
    }

    protected updateList(marble: Marble) {
        let len = this.collectedMarbles.length;
        if (len > 0 && this.collectedMarbles[len - 1].colour == marble.colour) {
            this.collectedMarbles[len - 1].amount += 1;
        } else {
            this.collectedMarbles.push(new MarblePair(1, marble.colour));
        }
    }

    private getSetOfJoining(position: Pos, setVisited: Set<string>, setAccepted: Set<Slot>) {
        console.log("startOfJoin");
        setVisited.add(JSON.stringify(position));

        let xPos = position.x;
        let yPos = position.y;

        let slot = this.slots[xPos][yPos]
        let connections = [new Pos(xPos - 1, yPos), new Pos(xPos + 1, yPos), new Pos(xPos, yPos - 1), new Pos(xPos, yPos + 1)];
        if (slot) {
            if (slot.piece instanceof Gear) {
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

    newGearComp(position: Pos) {
        // Will decide if this gear bit needs to change direction
        let visitedPos = new Set<string>();
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
                    let orgLocked = val.piece.locked;
                    val.piece = (dirForGbs == Direction.left) ? new GearBit(Direction.left, val.piece.position) : new GearBit(Direction.right, val.piece.position);
                    if (val.piece.locked != orgLocked) {
                        val.piece.lock();
                    }
                }
            }
        }
    }

    clickPiece(pos: Pos): boolean {
        let changed = false;
        let newPiece: BoardPiece;
        if (this.intercepted) {
            this.intercepted = false;
            this.inPlayMarble = null;
        }

        switch (this.heldPiece) {
            case Piece.Ramp:
                newPiece = (new Ramp(Direction.left, pos));
                break;
            case Piece.Crossover:
                newPiece = (new Crossover(pos));
                break;
            case Piece.GearBit:
                newPiece = (new GearBit(Direction.left, pos));
                break;
            case Piece.Interceptor:
                newPiece = (new Interceptor(pos));
                break;
            case Piece.Bit:
                newPiece = (new Bit(Direction.left, pos));
                break;
            case Piece.Gear:
                newPiece = (new Gear(pos));
                break;
            case Piece.Delete:
                newPiece = null
        }

        let slot = this.slots[pos.x][pos.y];
        // Delete piece
        if (newPiece == null) {
            if (slot.piece && !slot.piece.locked) {
                slot.piece = newPiece;
                changed = true;
            }
        }
        // Pin
        else if (slot instanceof Pin && newPiece instanceof Gear) {
            if (!slot.piece || !slot.piece.locked) {
                slot.piece = newPiece;
                this.newGearComp(new Pos(pos.x, pos.y));
                changed = true;
            }
        } else if (slot instanceof CompSlot) {
            if (!slot.piece || ((slot.piece.type != newPiece.type) && !slot.piece.locked)) {
                changed = true;
                slot.piece = newPiece;
                if (newPiece instanceof GearBit || newPiece instanceof Gear) {
                    this.newGearComp(new Pos(pos.x, pos.y));
                }
            }
        }
        // If just clicked
        if (!changed && slot.piece) {
            slot.piece.click()
            if (slot.piece instanceof Gear || slot.piece instanceof GearBit) {
                this.gearSpin(pos);
            }
        }

        return changed;
    }

    gearSpin(position: Pos) {
        // Will check what neighboring gears will need to spin also
        console.log("GearSpin called");
        console.log(position);
        let visitedPos = new Set<string>();
        let acceptedPos = new Set<Slot>();
        this.getSetOfJoining(position, visitedPos, acceptedPos);

        var firstEle: boolean = true;
        var dirForGbs: Direction;

        for (var it = acceptedPos.values(), val: Slot = null; val = it.next().value;) {
            if (firstEle) {
                firstEle = false;
                if (val.piece instanceof GearBit) dirForGbs = val.piece.direction;
            } else {
                let orgLocked = val.piece.locked;
                val.piece = (dirForGbs == Direction.left) ? new GearBit(Direction.left, val.piece.position) : new GearBit(Direction.right, val.piece.position);
                if (val.piece.locked != orgLocked) {
                    val.piece.lock();
                }
            }
        }
        console.log(dirForGbs);
    }

    clearMarbles() {
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();
    }

    setExample(examNumber: number) {
        let example: Slot[][];
        switch (examNumber) {
            case 1:
                example = Example1.getSlots();
                break;
            case 2:
                example = Example2.getSlots();
                break;
            case 3:
                example = Example3.getSlots();
                break;
            case 4:
                example = Example4.getSlots();
                break;
        }
        this.slots = cloneDeep(example)
    }
}
