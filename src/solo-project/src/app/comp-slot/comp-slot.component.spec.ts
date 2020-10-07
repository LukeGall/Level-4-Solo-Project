import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSlotComponent } from './comp-slot.component';

describe('CompSlotComponent', () => {
  let component: CompSlotComponent;
  let fixture: ComponentFixture<CompSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
