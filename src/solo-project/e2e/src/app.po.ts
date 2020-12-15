import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(to: string): Promise<unknown> {
    return browser.get(to) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('#title')).getText() as Promise<string>;
  }
}
