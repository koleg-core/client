import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public firstName = '';
  public isDarkModeEnabled = false;
  public selectedLang = navigator.language.split('-')[0];

  public myInformation = [
    {
      name: 'MAIN_PAGE.MY_INFORMATION.PROFILE',
      path: '/main/users/details/' + (this.authService.user ? this.authService.user.value.id : ''),
      disabled: (this.authService.user ? false : true)
    },
    {
      name: 'MAIN_PAGE.MY_INFORMATION.GROUPS',
      path: '/main/groups',
      disabled: false
    }
  ];

  public explorePages = [
    {
      name: 'JOBS_PAGE.TITLE',
      path: '/main/jobs',
      disabled: false
    },
    {
      name: 'USERS_PAGE.TITLE',
      path: '/main/users',
      disabled: false
    },
    {
      name: 'GROUPS_PAGE.TITLE',
      path: '/main/groups',
      disabled: false
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
    private translate: TranslateService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    const darkModePref = this.localStorageService.isDarkMode.value;
    if (darkModePref) {
      this.isDarkModeEnabled = darkModePref;
      document.body.classList.toggle('dark', this.isDarkModeEnabled);
    }

    const langPref = this.localStorageService.lang.value;
    if (langPref) {
      this.selectedLang = langPref;
      this.translate.use(this.selectedLang);
    }

    this.authService.user.subscribe(user => {
      if (user) {
        this.firstName = user.firstName;
      }
    });
  }

  onChangeDarkModeToggle() {
    this.localStorageService.isDarkMode.next(this.isDarkModeEnabled);
    document.body.classList.toggle('dark', this.isDarkModeEnabled);
  }

  onChangeLanguage() {
    this.localStorageService.lang.next(this.selectedLang);
    this.translate.use(this.selectedLang);
  }

}
