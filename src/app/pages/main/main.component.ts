import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public username = '';
  public isDarkModeEnabled = false;
  public selectedLang = navigator.language.split('-')[0];

  public explorePages = [
    {
      name: 'JOBS_PAGE.TITLE',
      path: '/main/jobs'
    },
    {
      name: 'USERS_PAGE.TITLE',
      path: '/main/users'
    },
    {
      name: 'GROUPS_PAGE.TITLE',
      path: '/main/groups'
    }
  ];

  public contactPages = [
    {
      name: 'ABOUT_PAGE.TITLE',
      path: '/about'
    }
  ];

  public langs = environment.langs;

  constructor(
    private localStorageService: LocalStorageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const darkModePref = this.localStorageService.getDarkModePref();
    if (darkModePref) {
      this.isDarkModeEnabled = darkModePref;
      document.body.classList.toggle('dark', this.isDarkModeEnabled);
    }

    const langPref = this.localStorageService.getLangPref();
    if (langPref) {
      this.selectedLang = langPref;
      this.translate.use(this.selectedLang);
    }
  }

  onChangeDarkModeToggle() {
    this.localStorageService.setDarkModePref(this.isDarkModeEnabled);
    document.body.classList.toggle('dark', this.isDarkModeEnabled);
  }

  onChangeLanguage() {
    this.localStorageService.setLangPref(this.selectedLang);
    this.translate.use(this.selectedLang);
  }

}
