// Clone Deep has been taken from the lodash library under the MIT license, with more details on the Github Wiki
import { cloneDeep } from 'lodash';
import { parseSlotString } from 'src/app/Shared/convert-functions';
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
import { Dispenser } from './dispenser';
import { Flipper } from './flipper';
import { Marble } from './marble';
import { MarblePair } from './marblePair';
import { Pin } from './pin';
import { Pos } from './pos';
import { Slot } from './slot';

export class Board {
    slots: Slot[][] = new Array<Array<Slot>>();
    blueMarbles: number = 0;
    redMarbles: number = 0;
    inPlayMarble: Marble = null;
    collectedMarbles: MarblePair[] = new Array<MarblePair>();
    boardPieces: any = new Map([[Piece.Ramp, -1], [Piece.Gear, -1], [Piece.Bit, -1], [Piece.Crossover, -1], [Piece.GearBit, -1], [Piece.Interceptor, -1]]);
    heldPiece: Piece = null;
    inPlay: boolean = false;

    private intercepted: boolean = false;
    private playLock: boolean = false;
    private speedInMs: number = 1000;

    constructor(numOfMarbles: number) {
        this.slots[0] = new Array<Slot>();
        this.slots[1] = new Array<Slot>();
        this.slots[2] = new Array<Slot>();

        this.slots[0].push(null, null, null, new Dispenser(new Pos(0, 3), 'blue'), null, null, null, new Dispenser(new Pos(0, 7), 'red'), null, null, null);
        // Add the 2 top unique rows
        this.slots[1].push(null, null, new Pin(), new CompSlot(), new Pin(), null, new Pin(), new CompSlot(), new Pin(), null, null);
        this.slots[2].push(null, new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), new CompSlot(), new Pin(), null);

        // Adds the standard rows
        for (var i = 3; i < 11; i++) {
            this.slots[i] = new Array<Slot>();
            for (var j = 0; j < 11; j++) {
                this.slots[i].push(((j + i) % 2 != 0) ? new Pin() : new CompSlot());
            }
        }

        // Add the last unique row
        const bluePos = new Pos(0, 3);
        const redPos = new Pos(0, 7);
        this.slots[11] = new Array<Slot>();
        this.slots[11].push(null, new Flipper(bluePos, 'blue'), null, new Flipper(bluePos, 'blue'), new Pin(), new CompSlot(), new Pin(), new Flipper(redPos, 'red'), null, new Flipper(redPos, 'red'), null);
        this.slots[12] = new Array<Slot>();
        this.slots[12].push(null, null, null, null, new Flipper(bluePos, 'blue'), null, new Flipper(redPos, 'red'), null, null, null, null);

        // Add the marbles
        this.blueMarbles = numOfMarbles;
        this.redMarbles = numOfMarbles;
    }

    resetBoard() {
        this.clearMarbles();
        for (var i = 0; i < this.slots.length; i++) {
            for (var j = 0; j < this.slots[0].length; j++) {
                if (this.slots[i][j]) {
                    this.slots[i][j].piece = null;
                }
            }
        }
    }

    clearMarbles() {
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();
    }

    setHeldPiece(piece: Piece) {
        this.heldPiece = piece;
    }

    increaseMarble(colour: string) {
        if (colour == "blue") {
            this.blueMarbles++;
        } else {
            this.redMarbles++;
        }
    }

    decreaseMarble(colour: string) {
        if (colour == "blue") {
            if (this.blueMarbles > 0)
                this.blueMarbles--;
        } else {
            if (this.redMarbles > 0)
                this.redMarbles--;
        }
    }

    startMarble(colour: string) {
        if (!this.inPlay) {
            this.inPlayMarble = null;
            this.releaseMarble(colour);

            this.inPlay = true;
            this.play();
        }
    }

    private releaseMarble(colour: string, pos?: Pos) {
        if (colour == "blue") {
            if (this.blueMarbles > 0) {
                this.blueMarbles--;
                if (pos) {
                    const slot = this.slots[pos.x][pos.y] as Dispenser;
                    this.inPlayMarble = slot.outputMarble();
                } else if (this.slots[0][3] instanceof Dispenser) {
                    this.inPlayMarble = (this.slots[0][3] as Dispenser).outputMarble();
                } else {
                    this.inPlayMarble = new Marble('blue');
                }
            } else {
                this.inPlayMarble = null;
            }
        } else {
            if (this.redMarbles > 0) {
                this.redMarbles--;
                if (pos) {
                    const slot = this.slots[pos.x][pos.y] as Dispenser;
                    this.inPlayMarble = slot.outputMarble();
                } else if (this.slots[0][7] instanceof Dispenser) {
                    this.inPlayMarble = (this.slots[0][7] as Dispenser).outputMarble();
                } else {
                    this.inPlayMarble = new Marble('red');
                }
            } else {
                this.inPlayMarble = null;
            }
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
        if (newSpeed >= 100 && newSpeed <= 3100) {
            this.speedInMs = newSpeed;
        }
    }

    private async play() {
        // Use a 'playLock' to stop toggle button spamming
        if (!this.playLock) {
            this.playLock = true;
            // Ensure that the first dropped marble doesn't instantly go to it's next position
            await this.sleep();
            while (this.inPlayMarble && this.inPlay) {
                this.dropMarble();
                await this.sleep();
            }
            this.playLock = false;
            this.inPlay = false;
        }
    }

    private sleep() {
        return new Promise(resolve => setTimeout(resolve, this.speedInMs));
    }

    private dropMarble() {
        let marble = this.inPlayMarble;
        if (marble != undefined) {
            if (marble.direction != Direction.stopped) {
                let slot = this.slots[marble.position.x][marble.position.y];

                if (slot && slot.partName == 'CompSlot') {
                    if (slot.piece && !(slot.piece.type == Piece.Gear)) {
                        let oldPos = new Pos(marble.position.x, marble.position.y);
                        let [newPiece, newMarble] = slot.piece.processMarble(marble);

                        if (newPiece) {
                            slot.piece = this.getNewPiece(newPiece.type, newPiece.direction, newPiece.position, newPiece.locked);
                        }

                        if (slot.piece.type == Piece.GearBit) {
                            this.gearSpin(oldPos);
                        }

                        if (newMarble.position.y < 0) {
                            newMarble.position.y = 0;

                        } else if (newMarble.position.y > this.slots[0].length - 1) {
                            newMarble.position.y = this.slots[0].length - 1;
                        }
                        this.inPlayMarble = newMarble;
                    } else {
                        this.marbleFall();
                        return;
                    }
                } else if (slot instanceof Flipper) {
                    console.log("flip");
                    const posOfDis = slot.getPosOfDis();
                    this.updateList(marble);
                    this.releaseMarble(slot.colour, posOfDis);
                } else {
                    this.workOutFlipperColour(marble);
                    return;
                }
            } else {
                this.intercepted = true;
                this.inPlay = false;
            }
        }
    }

    private marbleInBounds(position: Pos): boolean {
        return (position.x >= 0 && position.x < this.slots.length && position.y >= 0 && position.y <= this.slots[0].length)
    }

    private marbleFall() {
        this.inPlayMarble = null;
        this.inPlay = false;
    }

    // Would need to change it so it is the last row that can just keep going or check if pin or compslot 
    workOutFlipperColour(marble: Marble) {
        // Makes sure any balls sent to the sides is only valid on the last 2 rows
        const lastRow = this.slots.length - 1;
        if (marble.position.x >= lastRow) {
            if (marble.position.x == lastRow && marble.position.y == 5 && this.slots[lastRow][5].piece) {
                let [newPiece, newMarble] = this.slots[lastRow][5].piece.processMarble(marble);
                if (newPiece) {
                    this.slots[lastRow][5].piece = newPiece;
                }
                this.inPlayMarble = newMarble;
                marble = newMarble;
            }

            let posY = marble.position.y;
            if (posY > -1 && posY < this.slots[0].length) {
                this.updateList(marble);
                this.releaseMarble("blue");
            } else if (posY > 5 && posY < this.slots[0].length) {
                this.updateList(marble);
                this.releaseMarble("red");
            } else {
                this.marbleFall();
            }
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
        this.collectedMarbles = Object.assign(new Array<MarblePair>(), this.collectedMarbles)
    }

    private getSetOfJoining(position: Pos, setVisited: Set<string>, setAccepted: Set<Slot>) {
        // Breadth first style search to get all the GearBits that are connected to each other
        setVisited.add(JSON.stringify(position));

        let xPos = position.x;
        let yPos = position.y;

        let slot = this.slots[xPos][yPos]
        let connections = [new Pos(xPos - 1, yPos), new Pos(xPos + 1, yPos), new Pos(xPos, yPos - 1), new Pos(xPos, yPos + 1)];
        if (slot && slot.piece) {
            if (slot.piece.type == Piece.Gear || slot.piece.type == Piece.GearBit) {
                if (slot.piece.type == Piece.GearBit) {
                    setAccepted.add(slot);
                }
                connections.forEach(pos => {
                    if (this.marbleInBounds(pos) && !setVisited.has(JSON.stringify(pos))) {
                        this.getSetOfJoining(pos, setVisited, setAccepted);
                    }
                })
            }
        }
    }


    gearSpin(position: Pos) {
        // Will check what neighboring gears will need to spin to match
        let visitedPos = new Set<string>();
        let acceptedPos = new Set<Slot>();
        this.getSetOfJoining(position, visitedPos, acceptedPos);

        var firstEle: boolean = true;
        var dirForGbs: Direction;

        for (var it = acceptedPos.values(), val: Slot = null; val = it.next().value;) {
            if (firstEle) {
                firstEle = false;
                dirForGbs = val.piece.direction;
            }

            if (val.piece instanceof GearBit) {
                val.piece = this.getNewPiece(val.piece.type, dirForGbs, val.piece.position, val.piece.locked);
            }

        }
    }

    clickPiece(pos: Pos): boolean {
        let changed = false;
        let newPiece: BoardPiece;
        let slot = this.slots[pos.x][pos.y];
        let oppDirection: Direction = null;

        // Will let users add new piece but make sure old marble is removed if caught by interceptor  
        if (this.intercepted) {
            this.intercepted = false;
            // Sorts out onpush issue
            this.inPlayMarble = new Marble();
            this.inPlayMarble = null;
        }

        if (slot.piece) {
            if (slot.piece.type == Piece.Bit || slot.piece.type == Piece.GearBit || slot.piece.type == Piece.Ramp) {
                oppDirection = slot.piece.direction == Direction.left ? Direction.right : Direction.left;
            }
        }

        let dir = oppDirection ? oppDirection : Direction.left
        newPiece = this.getNewPiece(this.heldPiece, dir, pos);


        // Delete piece
        if (newPiece == null) {
            if (slot.piece && !slot.piece.locked) {
                slot.piece = newPiece;
                changed = true;
            }
        }
        // Pin
        else if (slot.partName == 'Pin' && newPiece.type == Piece.Gear) {
            if (!slot.piece) {
                slot.piece = newPiece;
                this.gearSpin(new Pos(pos.x, pos.y));
                changed = true;
            }
        } else if (slot.partName == 'CompSlot') {
            if (!slot.piece || ((slot.piece.type != newPiece.type) && !slot.piece.locked)) {
                changed = true;
                slot.piece = newPiece;
                if (newPiece.type == Piece.GearBit || newPiece.type == Piece.Gear) {
                    this.gearSpin(new Pos(pos.x, pos.y));
                }
            }
        }
        // If just clicked
        if (!changed && slot.piece) {
            if (slot.piece.locked) {
                slot.piece.click();
                slot.piece = this.getNewPiece(slot.piece.type, dir, pos, true);
            } else {
                slot.piece = newPiece;
            }
            if (slot.piece.type == Piece.Gear || slot.piece.type == Piece.GearBit) {
                this.gearSpin(pos);
            }
        }

        return changed;
    }

    setExample(examNumber: number) {
        let example: Slot[][];
        switch (examNumber) {
            case 1:
                example = parseSlotString(Example1.example1);
                break;
            case 2:
                example = parseSlotString(Example2.example2);
                break;
            case 3:
                example = parseSlotString(Example3.example3);
                break;
            case 4:
                example = parseSlotString(Example4.example4);
                break;
        }
        this.slots = cloneDeep(example)
    }

    protected getNewPiece(oldPiece: Piece, dir: Direction, pos: Pos, lock?: boolean): BoardPiece {
        let newPiece: BoardPiece;
        switch (oldPiece) {
            case Piece.Ramp:
                newPiece = (new Ramp(dir, pos));
                break;
            case Piece.Crossover:
                newPiece = (new Crossover(pos));
                break;
            case Piece.GearBit:
                newPiece = (new GearBit(dir, pos));
                const joins: number[] = [];
                const xPos = pos.x;
                const yPos = pos.y;
                let connections = [new Pos(xPos, yPos - 1), new Pos(xPos - 1, yPos), new Pos(xPos, yPos + 1), new Pos(xPos + 1, yPos)];
                for (var i = 0; i < connections.length; i++) {
                    const tempPos = connections[i];
                    if (this.marbleInBounds(tempPos)) {
                        if (this.slots[tempPos.x][tempPos.y] && this.slots[tempPos.x][tempPos.y].piece) {
                            if (this.slots[tempPos.x][tempPos.y].piece.type == Piece.Gear) {
                                joins.push(i + 1);
                            }
                        }
                    }
                };

                if (newPiece instanceof GearBit) newPiece.joins = joins;
                break;
            case Piece.Interceptor:
                newPiece = (new Interceptor(pos));
                break;
            case Piece.Bit:
                newPiece = (new Bit(dir, pos));
                break;
            case Piece.Gear:
                newPiece = (new Gear(pos));
                break;
            case Piece.Delete:
                newPiece = null
        }
        if (newPiece && lock) newPiece.lock();
        return newPiece;
    }
}
