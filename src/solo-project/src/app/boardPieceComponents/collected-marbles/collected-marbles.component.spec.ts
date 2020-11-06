import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectedMarblesComponent } from './collected-marbles.component';

describe('CollectedMarblesComponent', () => {
  let component: CollectedMarblesComponent;
  let fixture: ComponentFixture<CollectedMarblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectedMarblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectedMarblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
