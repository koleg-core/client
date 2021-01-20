import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { AbstractFormPage } from '../abstract-form-page/abstract-form-page';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent extends AbstractFormPage implements OnInit {

  public isLoading = false;
  public isDarkMode = false;

  constructor(
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private loadingController: LoadingController,
    private translate: TranslateService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this._initializeAuthForm();
    this.isDarkMode = this.localStorageService.isDarkMode.value;
  }

  onClickResetPasswordButton(): void {
    this.navController.navigateRoot(['auth', 'reset-password']);
  }

  onKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  async onSubmit() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const username: string = this.formGroup.get('username').value;
      const password: string = this.formGroup.get('password').value;

      const loading = await this.loadingController.create({
        message: this.translate.instant('COMMON.LOADING_MESSAGE'),
      });
      await loading.present();

      this.isLoading = true;
      this.authenticationService.login(username, password)
        .then(() => {
          this.navController.navigateRoot(['main']);
        })
        .catch((error) => {
          console.log(error);
          this.toastService.presentToastDanger();
        })
        .finally(() => {
          this.isSubmitted = false;
          this.isLoading = false;
          loading.dismiss();
        });
    }
  }

  public getAppVersion(): string {
    return '1.0.0'; // TODO
  }

  private _initializeAuthForm(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.validationMessages = {
      username: [
        { type: 'required', message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
      ],
      password: [
        { type: 'required', message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
      ]
    };
  }

}
