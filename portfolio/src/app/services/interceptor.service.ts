import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest }
  from '@angular/common/http';
import { AccountService } from './account.service';
import { Stock } from './stocks.model';
import { ConfigService } from './config.service';

@Injectable()
export class StocksInterceptor implements HttpInterceptor{

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //httprequest es inmutable. Creamos una copia
    const request = req.clone();

    //Añadimos un header al request
    request.headers.append('Accept', 'application/json');

    //Procesamos el request, y observamos la respuesta. Con do podemos hacer acciones en la respuesta sin modificarla propiamente dicha. Para modificar la respuesta habriamos usado el operador map
    return next.handle(request).do(event => {
      //Si el evento es una respuesta http, y la url es nuestra api...
      if (event instanceof HttpResponse && event.url === ConfigService.get('api')) {
        //Toma el cuerpo de la respuesta
        const stocks = event.body as Array<Stock>;

        let symbols = this.accountService.stocks.map(stock => stock.symbol);

        stocks.forEach(stock => {
          //Stream sobre cada stock guardado en accoutService...
          this.accountService.stocks.map(item => {
            //... cambia el contenido de accountService con el nuevo precio
            if (stock.symbol === item.symbol) {
              item.price = stock.price;
              item.change = ((stock.price * 100) - (item.cost * 100)) / 100;
            }
          });
        });

        this.accountService.calculateValue();

        return stocks;
      }
    });
  }


}
