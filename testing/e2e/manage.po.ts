import { element, by } from 'protractor';

export class ManagePage {
  navigateTo() {
    return element(by.linkText('Manage')).click();
  }

  getSymbols() {
    return element.all(by.css('.mdl-data-table__cell--non-numeric'));
  }

  getRemoveButton(index) {
    return element.all(by.buttonText('Remove')).get(index);
  }

  getAddInput() {
    return element(by.name('stock'));
  }
}
