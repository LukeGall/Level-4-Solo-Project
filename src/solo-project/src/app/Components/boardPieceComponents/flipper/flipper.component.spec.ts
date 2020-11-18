import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperComponent } from './flipper.component';

describe('FlipperComponent', () => {
  let component: FlipperComponent;
  let fixture: ComponentFixture<FlipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
