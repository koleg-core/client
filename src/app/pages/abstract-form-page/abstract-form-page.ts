import { FormControl, FormGroup } from '@angular/forms';

export class AbstractFormPage {

  public formGroup: FormGroup;
  public validationMessages: { [fieldName: string]: { type: string, message: string }[] };
  public isSubmitted = false;

  constructor() { }

  public shouldDisplayErrorMessage(formControl: FormControl, validationType: string): boolean {
    return (this.isSubmitted && formControl.hasError(validationType))
      || (formControl.hasError(validationType)
        && (formControl.dirty || formControl.touched));
  }

  // Warning : these classes are only applicable on ion-item component at the moment
  public getValidationClasses(formControl: FormControl) {
    return {
      'invalid-form-field': (this.isSubmitted && this._isFormControlHasErrors(formControl)) || this._isFormControlInvalid(formControl),
      'valid-form-field': this._isFormControlValid(formControl)
    };
  }

  private _isFormControlTouchedOrDirty(formControl: FormControl): boolean {
    return formControl.dirty || formControl.touched;
  }

  private _isFormControlValid(formControl: FormControl): boolean {
    return !this._isFormControlHasErrors(formControl) && this._isFormControlTouchedOrDirty(formControl);
  }

  private _isFormControlInvalid(formControl: FormControl): boolean {
    return this._isFormControlHasErrors(formControl) && this._isFormControlTouchedOrDirty(formControl);
  }

  private _isFormControlHasErrors(formControl: FormControl): boolean {
    return formControl.errors ? true : false;
  }

}
