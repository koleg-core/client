import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private readonly DARK_MODE_KEY = 'darkModeEnabled';
  private readonly LANG_KEY = 'lang';
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(
  ) { }

  // DARK MODE
  public setDarkModePref(value: boolean) {
    localStorage.setItem(this.DARK_MODE_KEY, String(value));
  }

  public getDarkModePref(): boolean {
    try {
      return JSON.parse(localStorage.getItem(this.DARK_MODE_KEY));
    } catch (error) {
      return false;
    }
  }

  // LANG 
  public setLangPref(value: string) {
    localStorage.setItem(this.LANG_KEY, String(value));
  }

  public getLangPref(): string {
    return localStorage.getItem(this.LANG_KEY);
  }

  // TOKEN
  public setToken(value: string) {
    localStorage.setItem(this.TOKEN_KEY, value);
  }

  public removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
