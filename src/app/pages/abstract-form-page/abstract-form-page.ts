import { FormGroup } from '@angular/forms';

export class AbstractFormPage {

  public formGroup: FormGroup;
  public validationMessages: { [fieldName: string]: { type: string, message: string }[] };
  public isSubmitted = false;

  constructor() { }

  public shouldDisplayErrorMessage(fieldName: string, validationType: string): boolean {
    return (this.isSubmitted && this.formGroup.get(fieldName).hasError(validationType))
      || (this.formGroup.get(fieldName).hasError(validationType)
        && (this.formGroup.get(fieldName).dirty || this.formGroup.get(fieldName).touched));
  }

  // Warning : these classes are only applicable on ion-item component at the moment
  public getValidationClasses(formField: string) {
    return {
      'invalid-form-field': (this.isSubmitted && this._isFormFieldHasErrors(formField)) || this._isFormFieldInvalid(formField),
      'valid-form-field': this._isFormFieldValid(formField)
    };
  }

  private _isFormFieldTouchedOrDirty(formField: string): boolean {
    return this.formGroup.get(formField).dirty || this.formGroup.get(formField).touched;
  }

  private _isFormFieldValid(formField: string): boolean {
    return !this._isFormFieldHasErrors(formField) && this._isFormFieldTouchedOrDirty(formField);
  }

  private _isFormFieldInvalid(formField: string): boolean {
    return this._isFormFieldHasErrors(formField) && this._isFormFieldTouchedOrDirty(formField);
  }

  private _isFormFieldHasErrors(formField: string): boolean {
    return this.formGroup.get(formField).errors ? true : false;
  }

}
