import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create all the grid-icons',()=>{
    const debug= fixture.debugElement.query(By.css('.board'));
    const gridList: NodeList = debug.nativeElement.querySelectorAll('mat-grid-tile')
    expect(gridList.length).toEqual(11*11);
  })

  it('should display a speed slider',()=>{
    const slider = fixture.nativeElement.querySelector('mat-slider')
    expect(slider).toBeTruthy();
  })
});
