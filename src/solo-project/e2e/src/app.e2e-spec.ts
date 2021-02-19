import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('');
    expect(page.getTitleText()).toEqual('Virtual Turing Tumble');
  });

  it('should hide and open sidenav', () => {
    page.navigateTo('');
    expect(element(by.css('.sidenav')).getText()).toEqual('', 'Should be empty at start');

    element(by.css('.menu-icon')).click()
    expect(element(by.css('.sidenav')).getText()).toContain('Log in', 'Should display the new profile option now');
  });

  it('should let us click a piece', () => {
    page.navigateTo('');
    element(by.css('.menu-icon')).click();

    element(by.buttonText('Plain Board')).click();
    element(by.buttonText('Ramp')).click();
  })

  it('should let us nav to tutorial', () => {
    page.navigateTo('');
    element(by.css('.menu-icon')).click()

    element(by.buttonText('Tutorial')).click().then(() => {
      browser.sleep(1000).then(() => {
        expect(element(by.css('.mat-display-3')).getText()).toContain('Tutorial', 'Should have tutorial heading');
      });
    })
  });

  it('should allow the three different tutorial tabs to be visited', () => {
    page.navigateTo('');
    element(by.css('.menu-icon')).click()

    element(by.buttonText('Tutorial')).click();
    element.all((by.css('.mat-tab-label'))).get(1).click().then(() => { browser.sleep(1000) });
    expect(element(by.tagName('p')).getText()).toContain('All pieces', 'Should view next tab');
  })

  it('should be able to click change theme button', () => {
    page.navigateTo('');
    expect(element(by.css('.unicorn-dark-theme'))).toBeTruthy('Should have dark originally');
    element(by.buttonText('Change theme')).click();
    expect(element(by.css('.defTheme'))).toBeTruthy('Should have def theme after click');
  })

  it('should let us view some original puzzles', () => {
    page.navigateTo('');
    element(by.css('.menu-icon')).click();

    element(by.buttonText('Original Puzzles')).click().then(() => { browser.sleep(4000) });
    expect(element.all(by.css('.card')).count()).toBe(10);
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
