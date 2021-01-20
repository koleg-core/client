import { AbstractControl } from "@angular/forms";

export class UserValidator {

  public static checkPasswordAndConfirmPasswordValue(c: AbstractControl, passwordFieldName: string) {
    return new Promise(resolve => {
      if (c.parent) {
        const password = c.parent.controls[passwordFieldName].value;
        const confirmPassword = c.value;
        if (password === confirmPassword) {
          return resolve(null);
        } else {
          return resolve({ confirmPasswordNotMatch: true });
        }
      }
      return resolve({ confirmPasswordNotMatch: true });
    });
  }

  public static checkBirthdateValidity(c: AbstractControl) {
    return new Promise(resolve => {
      if (new Date(c.value) <= new Date()) {
        return resolve(null);
      } else {
        return resolve({ birthdateNotValid: true });
      }
    });
  }

  public static checkExpirationDateValidity(c: AbstractControl) {
    return new Promise(resolve => {
      if (!c.value || new Date(c.value) >= new Date()) {
        return resolve(null);
      } else {
        return resolve({ expirationDateNotValid: true });
      }
    });
  }
}