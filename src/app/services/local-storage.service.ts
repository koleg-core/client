import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService implements OnDestroy {

  public isDarkMode: BehaviorSubject<boolean>;
  public lang: BehaviorSubject<string>;

  private readonly DARK_MODE_KEY = 'darkModeEnabled';
  private readonly LANG_KEY = 'lang';
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(
  ) {
    this.isDarkMode = new BehaviorSubject(this._getDarkModePref());
    this.isDarkMode.subscribe(value => {
      localStorage.setItem(this.DARK_MODE_KEY, String(value));
    });

    this.lang = new BehaviorSubject(this._getLangPref());
    this.lang.subscribe(value => {
      localStorage.setItem(this.LANG_KEY, String(value));
    });
  }

  ngOnDestroy(): void {
    this.isDarkMode.unsubscribe();
    this.lang.unsubscribe();
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

  private _getDarkModePref(): boolean {
    try {
      return JSON.parse(localStorage.getItem(this.DARK_MODE_KEY));
    } catch (error) {
      return false;
    }
  }

  private _getLangPref(): string {
    return localStorage.getItem(this.LANG_KEY);
  }
}
