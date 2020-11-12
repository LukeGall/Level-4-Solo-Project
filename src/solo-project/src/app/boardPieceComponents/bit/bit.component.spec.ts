import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction } from 'src/app/boardParts/direction';
import { Pos } from 'src/app/boardParts/pos';
import { Bit } from 'src/app/boardPieces/bit';

import { BitComponent } from './bit.component';

describe('BitComponent', () => {
  let component: BitComponent;
  let fixture: ComponentFixture<BitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the direction of the bit',()=>{
    component.bit = new Bit(Direction.left,new Pos(0,0));
    fixture.detectChanges();
    let div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.textContent).toContain(component.bit.direction.toString());
  })
});
