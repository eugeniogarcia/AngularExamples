import { DashboardPage } from './dashboard.po';
import { ManagePage } from './manage.po';
import { protractor, browser, by, element } from 'protractor';

describe('Stock App', () => {
  let dashboard: DashboardPage;
  let manage: ManagePage;

  beforeEach(() => {
    dashboard = new DashboardPage();
    manage = new ManagePage();
    browser.get('/');
  });

  it('should load the dashboard default list', () => {
    dashboard.navigateTo();
    dashboard.getCards().then(stocks => {
      expect(stocks.length).toEqual(5);
    });
  });

  it('should load the manage stocks view', () => {
    manage.navigateTo();
    manage.getSymbols().then(symbols => {
      expect(symbols.length).toEqual(5);
    });
  });

  it('should add a new stock and be updated in dashboard', () => {
    dashboard.navigateTo();
    dashboard.getCards().then(stocks => {
      expect(stocks.length).toEqual(5);
    });

    manage.navigateTo();
    manage.getAddInput().sendKeys('MSFT', protractor.Key.RETURN);
    expect(manage.getSymbols().last().getText()).toEqual('MSFT');

    dashboard.navigateTo();
    dashboard.getCards().then(stocks => {
      expect(stocks.length).toEqual(6);
    });
  });

  it('should remove a stock and be updated in dashboard', () => {
    dashboard.navigateTo();
    dashboard.getCards().then(stocks => {
      expect(stocks.length).toEqual(5);
    });

    manage.navigateTo();
    manage.getRemoveButton(0).click();
    expect(manage.getSymbols().first().getText()).not.toEqual('AAPL');

    dashboard.navigateTo();
    dashboard.getCards().then(stocks => {
      expect(stocks.length).toEqual(4);
    });
  });
});
