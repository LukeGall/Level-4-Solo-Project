import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectionBarComponent } from './selection-bar.component';

describe('SelectionBarComponent', () => {
  let component: SelectionBarComponent;
  let fixture: ComponentFixture<SelectionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a list of buttons',()=>{
    let natEle = fixture.debugElement;
    let pieces = natEle.query(By.css('.pieces'));
    let buttons = pieces.nativeElement.querySelectorAll('button')
    expect(buttons.length).toEqual(component.partList.length, "Should have as many buttons as the list of parts");

    buttons.forEach(function(node, i) {
      expect(node.textContent).toContain(component.partList[i].toString(), "Should contain a button for "+i);
    })
  })

  it('Button click should update heldPart', ()=>{
    let natEle = fixture.nativeElement;
    let button = natEle.querySelector('button');
    
    expect(component.heldPart).toBeFalsy();
    button.click();
    expect(component.heldPart).toEqual("Ramp");
  })
});
