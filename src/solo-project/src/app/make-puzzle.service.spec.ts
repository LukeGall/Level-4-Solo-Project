import { TestBed } from '@angular/core/testing';

import { MakePuzzleService } from './make-puzzle.service';

describe('MakePuzzleService', () => {
  let service: MakePuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakePuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
