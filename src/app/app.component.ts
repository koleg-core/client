import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    const lang = this.localStorageService.getLangPref();
    if (lang) {
      this.translate.use(lang);
    } else {
      const newLang = navigator.language.split('-')[0];
      this.localStorageService.setLangPref(newLang);
      this.translate.use(newLang);
    }

    const isDarkModeEnabled = this.localStorageService.getDarkModePref();
    if (isDarkModeEnabled) {
      document.body.classList.toggle('dark', isDarkModeEnabled);
    } else {
      this.localStorageService.setDarkModePref(false);
    }
  }
}
