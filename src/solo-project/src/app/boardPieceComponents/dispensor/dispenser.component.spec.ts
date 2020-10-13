import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
