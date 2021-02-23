import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { MakePuzzleService } from './make-puzzle.service';

describe('MakePuzzleService', () => {
  let service: MakePuzzleService;
  const stub = {

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
});
