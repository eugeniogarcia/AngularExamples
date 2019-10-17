/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StocksService } from './stocks.service';
import { MockStocksResponse, MockSymbolsList, MockNewsResponse } from './stocks.mock';

describe('Service: Stocks', () => {
  const baseUrl = 'https://angular2-in-action-api.herokuapp.com';
  let service, http;

  beforeEach(() => {
    //Creamos un testing module con todas las cosas que necesitaremos para probar nuestro servicio...
    TestBed.configureTestingModule({
      //...con el modulo que mockea http client
      imports: [ HttpClientTestingModule ],
      //Vamos a usar el servicio StocksService
      providers: [ StocksService ]
    });
    //Con get buscamos el arbol de injected providers
    //Buscamos el stub del servicio a probar
    service = TestBed.get(StocksService);
    //Buscamos el stub del servicio httpclient. Este esta includido en HttpClientTestingModule, y es un mock service
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

  //En este caso pasamos done como argumento para controlar cuando el test termina, y se deben desmontar las cosas
  it('should load the stock data from API', (done) => {
    //Hacemos una llamada al metodo load del servicio, con el argumento MockSymbolsList y esperamos que la respuesta sea MockStocksResponse
    service.load(MockSymbolsList).subscribe(result => {
      expect(result).toEqual(MockStocksResponse);
      //El test ha terminado
      done();
    });

    //Definimos el mock.
    //Esperamos una llamada al servicio httpclient, al recurso especificado...
    const request = http.expectOne(baseUrl + '/stocks/snapshot?symbols=' + MockSymbolsList.join(','));
    //... y el mock contestara con esto
    request.flush(MockStocksResponse);
  });

  it('should load the news data from API', (done) => {
    service.getNewsSnapshot('abc').subscribe(result => {
      expect(result).toEqual(MockNewsResponse);
      done();
    });

    //Definimos el mock.
    //Esperamos una llamada al servicio httpclient, al recurso especificado...
    const request = http.expectOne(baseUrl + '/stocks/news/snapshot?source=abc');
    //... y el mock contestara con esto
    request.flush(MockNewsResponse);
  });
});
