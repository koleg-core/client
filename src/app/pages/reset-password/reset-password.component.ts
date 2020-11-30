import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public get formControls(): any {
    return this.resetPasswordForm.controls;
  }

  public resetPasswordForm: FormGroup;
  public isSubmitted = false;

  constructor(
  ) { }

  ngOnInit(): void {
    this._initializeAuthForm();
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    console.log(this.resetPasswordForm);
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