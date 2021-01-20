import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public get formControls(): any {
    return this.resetPasswordForm.controls;
  }

  public isDarkMode = false;
  public resetPasswordForm: FormGroup;
  public isSubmitted = false;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this._initializeAuthForm();
    this.isDarkMode = this.localStorageService.isDarkMode.value;
  }

  public onSubmit(): void {
    this.isSubmitted = true;
  }

  public hasEmailValue(): boolean {
    return this.formControls.email.value;
  }

  public isFormInvalid(): boolean {
    return this.isSubmitted
      && this.formControls.email.errors;
  }

  private _initializeAuthForm(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

}
