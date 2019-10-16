/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StocksService } from './stocks.service';
import { MockStocksResponse, MockSymbolsList, MockNewsResponse } from './stocks.mock';

describe('Service: Stocks', () => {
  const baseUrl = 'https://angular2-in-action-api.herokuapp.com';
  let service, http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //Cargamos el modulo de testing
      imports: [ HttpClientTestingModule ],
      //Vamos a usar el servicio StocksService
      providers: [ StocksService ]
    });
    //Creamos un stub para el servicio
    service = TestBed.get(StocksService);
    //Creamos un stub para el testing controller
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('should manage a list of stocks', () => {
    expect(service.get()).toEqual(MockSymbolsList);
    service.add('TEST');
    expect(service.get()).toEqual([...MockSymbolsList, 'TEST']);
    service.remove('TEST');
    expect(service.get()).toEqual(MockSymbolsList);
  });

  it('should load the stock data from API', (done) => {
    //Hacemos una llamada al metodo load del servicio, con el argumento MockSymbolsList y esperamos que la respuesta sea MockStocksResponse
    service.load(MockSymbolsList).subscribe(result => {
      expect(result).toEqual(MockStocksResponse);
      //El test ha terminado
      done();
    });

    //Definimos el mock. Esperamos una peticion, al recurso especificado...
    const request = http.expectOne(baseUrl + '/stocks/snapshot?symbols=' + MockSymbolsList.join(','));
    //... y el mock contestara con esto
    request.flush(MockStocksResponse);
  });

  it('should load the news data from API', (done) => {
    service.getNewsSnapshot('abc').subscribe(result => {
      expect(result).toEqual(MockNewsResponse);
      done();
    });

    const request = http.expectOne(baseUrl + '/stocks/news/snapshot?source=abc');
    request.flush(MockNewsResponse);
  });
});
