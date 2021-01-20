import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private authService: AuthenticationService,
    private navController: NavController
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    const lang = this.localStorageService.lang.value;
    if (lang) {
      this.translate.use(lang);
    } else {
      const newLang = navigator.language.split('-')[0];
      this.localStorageService.lang.next(newLang);
      this.translate.use(newLang);
    }

    const isDarkModeEnabled = this.localStorageService.isDarkMode.value;
    if (isDarkModeEnabled) {
      document.body.classList.toggle('dark', isDarkModeEnabled);
    } else {
      this.localStorageService.isDarkMode.next(false);
    }

    this.authService.resumeSession()
      .then(() => {
        this.navController.navigateRoot('main');
      });
  }
}
