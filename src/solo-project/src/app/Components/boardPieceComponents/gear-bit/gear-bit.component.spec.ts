import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearBitComponent } from './gear-bit.component';

describe('GearBitComponent', () => {
  let component: GearBitComponent;
  let fixture: ComponentFixture<GearBitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearBitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearBitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
