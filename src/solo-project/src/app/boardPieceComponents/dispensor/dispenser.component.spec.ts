import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Marble } from 'src/app/boardParts/marble';

import { DispenserComponent } from './dispenser.component';

describe('DispenserComponent', () => {
  let component: DispenserComponent;
  let fixture: ComponentFixture<DispenserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display marble length',()=>{
    component.marbles = new Array<Marble>(new Marble("blue"), new Marble("blue"));
    fixture.detectChanges();
    const div =fixture.nativeElement.querySelector("div");
    expect(div.textContent).toContain(component.marbles.length);
  })
});
