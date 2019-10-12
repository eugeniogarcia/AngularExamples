import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
let service: string = 'https://angular2-in-action-api.herokuapp.com';

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

export interface NewsInterface {
  url: string;
  title: string;
}

@Injectable()
export class StocksService{

  private stocks_init: Array<string>;

  constructor(private http: HttpClient) {
    this.stocks_init=stocks;

    var acc = localStorage.getItem("acciones");
    if (acc) {
      stocks = acc.split(",");
    }
    else {
      localStorage.setItem("acciones", stocks.join(","));
    }
  }

  get() {
    return stocks;
  }

  reset(){
    stocks = this.stocks_init;
    localStorage.setItem("acciones", stocks.join(","));
  }

  add(stock) {
    stocks.push(stock);
    localStorage.setItem("acciones", stocks.join(","));

    return this.get();
  }

  remove(stock) {
    stocks.splice(stocks.indexOf(stock), 1);
    localStorage.setItem("acciones", stocks.join(","));
    console.log(stocks.join(","));
    return this.get();
  }

  load(symbols) {
    if (symbols) {
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symbols=' + symbols.join());
    }
  }
  getNewsSnapshot(source = 'the-wall-street-journal') {
    return this.http.get<NewsInterface>(service + '/stocks/news/snapshot?source=' + source);
  }

}
