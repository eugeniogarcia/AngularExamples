import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { MockNewsResponse, MockStocksResponse, MockSymbolsList } from './stocks.mock';
import { StocksService } from './stocks.service';

//Crea un stub del servicio StockService
export class StubStocksService extends StocksService {

  constructor() {
    //Pasa null como servicio HttpClient, respetando asi el contrato del servicio sin tener que crear el httpClient
    super({} as HttpClient);
  }

  //Respuestas mockeadas
  load(symbols: string[]) {
    return Observable.of(MockStocksResponse);
  }

  getNewsSnapshot(source: string) {
    return Observable.of(MockNewsResponse);
  }
}
