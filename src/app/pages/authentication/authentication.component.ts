import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public get formControls(): any {
    return this.authForm.controls;
  }

  public authForm: FormGroup;
  public isSubmitted = false;
  public isLoading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._initializeAuthForm();
  }

  onClickResetPasswordButton(): void {
    this.navController.navigateRoot(['auth', 'reset-password']);
  }

  async onSubmit() {
    this.isSubmitted = true;

    if (this.authForm.valid) {
      const username: string = this.authForm.get('username').value;
      const password: string = this.authForm.get('password').value;

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
          // TODO
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

  public isFormInvalid(): boolean {
    return this.isSubmitted
      && (this.formControls.username.errors
        || this.formControls.password.errors);
  }

  private _initializeAuthForm(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

}
