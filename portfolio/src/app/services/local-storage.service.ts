import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  get(key: string, fallback: any) {
    //Utiliza localstorage para recuperar un item
    let value = localStorage.getItem(key);
    return (value) ? JSON.parse(value) : fallback;
  }

  set(key: string, value: any) {
    //Utiliza localstorage para recuperar un item
    localStorage.setItem(key, JSON.stringify(value));
  }
}
