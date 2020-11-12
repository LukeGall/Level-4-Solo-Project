import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Virtual Turing Tumble');
  });

  it('should hide and open sidenav',()=>{
    page.navigateTo();
    expect(element(by.css('.sidenav')).getText()).toEqual('','Should be empty at start');
    
    element(by.css('.menu-icon')).click()
    expect(element(by.css('.sidenav')).getText()).toContain('New profile','Should display the new profile option now');
  });

  it('should let us click a piece',()=>{
    page.navigateTo();
    element(by.buttonText('Ramp')).click()
    expect(element(by.id('heldPart')).getText()).toEqual('Ramp');
  })

  it('should let us change direction of a ramp',()=>{
    page.navigateTo();
    element(by.buttonText('Ramp')).click();

    element(by.css('.compSlot')).click();
    expect(element(by.css('.compSlot')).getText()).toEqual('-1');

    element(by.css('.compSlot')).click();
    expect(element(by.css('.compSlot')).getText()).toEqual('1');
  })

  // Later on when more pages are active could try and navigate to them but good for now

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
