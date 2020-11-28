import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this._initializeAuthForm();
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.authForm.valid) {
      const username: string = this.authForm.get('username').value;
      const password: string = this.authForm.get('password').value;

      this.authenticationService.login(username, password)
        .then(() => {
          // TODO
        })
        .catch((error) => {
          // TODO
        })
        .finally(() => {
          this.isSubmitted = false;
        });
    }
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
