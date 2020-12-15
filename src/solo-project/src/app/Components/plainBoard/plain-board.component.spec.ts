import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

import { PlainBoardComponent } from './plain-board.component';

describe('PlainBoardComponent', () => {
  let component: PlainBoardComponent;
  let fixture: ComponentFixture<PlainBoardComponent>;
  const stub = {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: stub },
      ],
      declarations: [PlainBoardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display a speed slider', () => {
    const slider = fixture.nativeElement.querySelector('mat-slider')
    expect(slider).toBeTruthy();
  })
});
