import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private readonly DARK_MODE_KEY = 'darkModeEnabled';
  private readonly LANG_KEY = 'lang';

  constructor(
  ) { }

  public setDarkModePref(value: boolean) {
    window.localStorage.setItem(this.DARK_MODE_KEY, String(value));
  }

  public setLangPref(value: string) {
    window.localStorage.setItem(this.LANG_KEY, String(value));
  }

  public getDarkModePref(): boolean {
    try {
      return JSON.parse(window.localStorage.getItem(this.DARK_MODE_KEY));
    } catch (error) {
      return false;
    }
  }

  public getLangPref(): string {
    return window.localStorage.getItem(this.LANG_KEY);
  }
}
