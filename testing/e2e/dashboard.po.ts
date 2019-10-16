import { element, by } from 'protractor';

export class DashboardPage {
  navigateTo() {
    return element(by.linkText('Dashboard')).click();
  }

  getCards() {
    return element.all(by.css('.mdl-cell'));
  }
}
