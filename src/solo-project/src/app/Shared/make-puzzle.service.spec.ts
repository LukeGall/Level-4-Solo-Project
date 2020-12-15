import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { BoardPiece } from '../Classes/boardPieces/board-piece';
import { Example1 } from '../Classes/exampleBoards/example1';
import { MakePuzzleService } from './make-puzzle.service';

describe('MakePuzzleService', () => {
  let service: MakePuzzleService;
  const stub = {
    collection: (name: string) => {
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      })
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: stub },
      ],
    });
    service = TestBed.inject(MakePuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert example board pieces', () => {
    const slots = Example1.slots;
    service.convertSlots(slots);
    slots.forEach(slotArr => {
      slotArr.forEach(slot => {
        if (slot) {
          if(slot.piece){
            expect(slot instanceof BoardPiece).toBeTruthy();
          }
        }
      })
    })
  })
});
