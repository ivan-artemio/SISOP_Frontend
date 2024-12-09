import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  key = environment.keyCrypt;

  constructor() {}

  public addItem(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getItem(key: string) {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearStorage() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
}
