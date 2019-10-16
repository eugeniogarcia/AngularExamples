import { ChangePipe } from './change.pipe';
import { CurrencyPipe, PercentPipe } from '@angular/common';

//Define un test, con su nombre e inicializando una serie de parametros
describe('ChangePipe', () => {
  const currencyPipe = new CurrencyPipe('en-us');
  const percentPipe = new PercentPipe('en-us');
  const pipe = new ChangePipe(currencyPipe, percentPipe);
  const stock = {
    symbol: 'abc',
    lastTradePriceOnly: 100,
    change: 1,
    changeInPercent: 0.01
  };

  //Define un test unitario
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  //Define un test unitario
  it('should transform a stock value', () => {
    expect(pipe.transform(stock)).toEqual(`$1.00 (1.00%)`);
    stock.change = -3.45;
    stock.changeInPercent = -0.0345;
    expect(pipe.transform(stock)).toEqual(`-$3.45 (-3.45%)`);
  });
});
