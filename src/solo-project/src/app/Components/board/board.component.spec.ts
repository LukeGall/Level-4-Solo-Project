import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Board } from 'src/app/Classes/boardParts/board';

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
    const debug= fixture.debugElement;
    const gridList: NodeList = debug.nativeElement.querySelectorAll('mat-grid-tile')
    expect(gridList.length).toEqual(137);
  })
});
