import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PhoneType } from 'src/app/enums/phone-type.enum';
import { UserFormKey } from 'src/app/enums/user-form-key.enum';
import { ValidationType } from 'src/app/enums/validation-type.enum';
import { Job } from 'src/app/models/job';
import { User, UserProps } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { UsersService } from 'src/app/services/users.service';
import { UserValidator } from 'src/app/validators/user.validator';
import { AbstractFormPage } from '../abstract-form-page/abstract-form-page';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends AbstractFormPage {

  public isUpdate = false;
  public isLoading = false;
  public user: User = null;
  public groupIdsForm = new FormArray([]);
  public phoneNumbersForm = new FormArray([]);
  public phoneTypes: string[] = Object.values(PhoneType);
  public jobs: Job[] = [];
  public isPasswordVisible = false;
  public isConfirmPasswordVisible = false;
  public nowDate = new Date().toISOString().substring(0, 10);
  public expirationMaxDate = this._getExpirationDate();
  public userFormKey = UserFormKey;
  public profilePicture: string;

  private _userId: string;
  private _newProfileData: string = null;

  private readonly PHONE_VALIDATOR = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  private readonly UUID_VALIDATOR = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
  private readonly MAX_FILE_SIZE = 4000000;

  constructor(
    private usersService: UsersService,
    private navController: NavController,
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private toastService: ToastService
  ) {
    super();

    this.onFileLoaded = this.onFileLoaded.bind(this);
  }

  ionViewWillEnter() {
    this._userId = this.route.snapshot.queryParams.id;

    this.isUpdate = this._userId ? true : false;

    if (this.isUpdate) {
      this._getUser();
    } else {
      this._getJobs();
    }
  }

  onClickBackButton() {
    this.navController.pop();
  }

  onClickTogglePasswordVisibilityButton() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onClickToggleConfirmPasswordVisibilityButton() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {

      this.isLoading = true;

      const value = this.formGroup.value;

      const userProps: UserProps = {
        id: this._userId,
        firstName: value.firstName,
        lastName: value.lastName,
        birthdate: value.birthdate,
        email: value.email,
        jobId: value.jobId,
        profilePictureUrl: value.profilePictureUrl,
        expirationDate: value.expirationDate,
        groupsIds: value.groupIds,
        password: { value: value.password },
        isDisabled: value.isDisabled,
        sshKey: { publicKey: value.sshPublicKey, privateKey: value.sshPrivateKey },
        username: null,
        phoneNumbers: value.phoneNumbers.filter(phone => phone.value && phone.type)
      };

      if (this.isUpdate) {
        this._updateUser(userProps);
      } else {
        this._addUser(userProps);
      }
    }
  }

  onClickResetExpirationDateButton(e: Event) {
    e.stopPropagation();
    this.formGroup.get(UserFormKey.EXPIRATION_DATE).patchValue(null);
    this.formGroup.get(UserFormKey.EXPIRATION_DATE).updateValueAndValidity({ onlySelf: true });
  }

  onClickRemovePhoneInputButton(i: number) {
    this.phoneNumbersForm.removeAt(i);
  }

  onClickUploadProfileAvatar() {
    const openFileDialog = document.createElement('input');
    openFileDialog.type = 'file';
    openFileDialog.accept = 'image/jpg, image/png, image/svg';
    openFileDialog.click();
    openFileDialog.addEventListener('change', (e) => {
      const target = e.target as any;
      const file = target.files[0];
      this.formGroup.get(UserFormKey.PROFILE_PICTURE).markAsTouched({ onlySelf: true });
      if (file.size > this.MAX_FILE_SIZE) {
        this.formGroup.get(UserFormKey.PROFILE_PICTURE).setErrors({ fileTooLarge: true });
      } else {
        this.formGroup.get(UserFormKey.PROFILE_PICTURE).setErrors(null);
        this.formGroup.get(UserFormKey.PROFILE_PICTURE).patchValue(file);
        this.formGroup.get(UserFormKey.PROFILE_PICTURE).updateValueAndValidity();
        this._newProfileData = file;
        const reader = new FileReader();
        reader.onload = this.onFileLoaded;
        reader.readAsDataURL(file);
      }
    });
  }

  onClickResetProfileButton() {
    this.profilePicture = this.user.profilePictureUrl ? this.user.profilePictureUrl.toString() : null;
    this.formGroup.get(UserFormKey.PROFILE_PICTURE).markAsUntouched();
    this.formGroup.get(UserFormKey.PROFILE_PICTURE).patchValue(null);
    this.formGroup.get(UserFormKey.PROFILE_PICTURE).updateValueAndValidity();
  }

  onFileLoaded(e: any) {
    this.profilePicture = e.target.result;
  }

  private _initializeUserForm(user: User): void {

    if (user && Array.isArray(user.groupsIds) && user.groupsIds.length > 0) {
      user.groupsIds.forEach(groupId => {
        this.groupIdsForm.push(new FormControl(groupId, [Validators.pattern(this.UUID_VALIDATOR)]));
      });
    }

    if (user && Array.isArray(user.phoneNumbers) && user.phoneNumbers.length > 0) {
      user.phoneNumbers.forEach(phoneNumber => {
        this.phoneNumbersForm.push(this._getNewPhoneFormGroup(phoneNumber.type, phoneNumber.value));
      });
    }
    this.phoneNumbersForm.push(this._getNewPhoneFormGroup());

    this.formGroup = new FormGroup(this._getFormGroupControls(user));

    this.formGroup.get(UserFormKey.SSH_PRIVATE).valueChanges.subscribe((value: string) => {
      this._sshKeyValueChangeCallback(value, UserFormKey.SSH_PRIVATE, UserFormKey.SSH_PUBLIC);
    });

    this.formGroup.get(UserFormKey.SSH_PUBLIC).valueChanges.subscribe((value: string) => {
      this._sshKeyValueChangeCallback(value, UserFormKey.SSH_PUBLIC, UserFormKey.SSH_PRIVATE);
    });

    this.formGroup.get(UserFormKey.PASSWORD).valueChanges.subscribe((value: string) => {
      this._passwordChangeValueCallback(value, UserFormKey.PASSWORD, UserFormKey.CONFIRM_PASSWORD);
    });

    this._initValidationMessages();
  }

  private _getUser() {
    this.isLoading = true;
    this.usersService.getUser(this._userId)
      .then(user => {
        this.user = user;
        this.profilePicture = this.user.profilePictureUrl.toString();
        this._getJobs();
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _getJobs() {
    this.jobsService.getJobs()
      .then(jobs => {
        this.jobs = jobs;
        this._initializeUserForm(this.user);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _updateUser(userProps: UserProps) {
    this.usersService.updateUser(userProps)
      .then(async () => {
        if (userProps.password && userProps.password.value) {
          await this.usersService.updatePassword(this._userId, userProps.password.value);
        }

        if (this._newProfileData) {
          await this.usersService.uploadProfile(this._userId, this._newProfileData);
        }

        this.toastService.presentToast('USER_EDIT_PAGE.UPDATE_SUCCESS');
        setTimeout(() => {
          this.navController.pop();
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _addUser(userProps: UserProps) {
    this.usersService.addUser(userProps)
      .then(async () => {
        if (userProps.password && userProps.password.value) {
          await this.usersService.updatePassword(this._userId, userProps.password.value);
        }

        if (this._newProfileData) {
          await this.usersService.uploadProfile(this._userId, this._newProfileData);
        }

        this.toastService.presentToast('USER_EDIT_PAGE.ADD_SUCCESS');
        setTimeout(() => {
          this.navController.pop();
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _phoneValueChangeCallback(formGroup: FormGroup, value: string) {
    const previousValue = formGroup.value[UserFormKey.PHONE_NUMBER];

    if (!previousValue && value) {
      this.phoneNumbersForm.push(this._getNewPhoneFormGroup());
    }

    if (!value && previousValue) {
      this.phoneNumbersForm.removeAt(this.phoneNumbersForm.controls.length - 1);
    }
  }

  private _getExpirationDate(): string {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    return now.toISOString();
  }

  private _sshKeyValueChangeCallback(value: string, fieldA: string, fieldB: string) {
    const previousValue: string = this.formGroup.value[fieldA];

    if (!previousValue && value) {
      this.formGroup.get(fieldB).setValidators([Validators.required]);
      this.formGroup.get(fieldB).markAsTouched({ onlySelf: true });
      this.formGroup.get(fieldB).updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    if (!value && previousValue) {
      this.formGroup.get(fieldB).clearValidators();
      this.formGroup.get(fieldB).markAsUntouched({ onlySelf: true });
      this.formGroup.get(fieldB).updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  private _passwordChangeValueCallback(value: string, fieldA: string, fieldB: string) {
    const previousValue: string = this.formGroup.value[fieldA];

    if (!previousValue && value) {
      this.formGroup.get(fieldB).setValidators([Validators.required]);
      this.formGroup.get(fieldB).setAsyncValidators(
        (c: AbstractControl) => UserValidator.checkPasswordAndConfirmPasswordValue(c, fieldA)
      );
    }

    if (!value && previousValue) {
      this.formGroup.get(fieldB).clearValidators();
    }

    this.formGroup.get(fieldB).updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  private _initValidationMessages() {
    this.validationMessages = {};

    this.validationMessages[UserFormKey.FIRST_NAME] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.LAST_NAME] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.BIRTHDATE] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' },
      { type: ValidationType.BIRTHDATE_NOT_VALID, message: 'COMMON.FORMS.ERRORS.BAD_FORMAT' }
    ];

    this.validationMessages[UserFormKey.EMAIL] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' },
      { type: ValidationType.EMAIL, message: 'COMMON.FORMS.ERRORS.BAD_FORMAT' }
    ];

    this.validationMessages[UserFormKey.JOB_ID] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.PROFILE_PICTURE] = [
      { type: ValidationType.FILE_TOO_LARGE, message: 'COMMON.FORMS.ERRORS.FILE_TOO_LARGE' }
    ];

    this.validationMessages[UserFormKey.SSH_PRIVATE] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.SSH_PUBLIC] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.EXPIRATION_DATE] = [
      { type: ValidationType.EXPIRATION_DATE_NO_VALID, message: 'COMMON.FORMS.ERRORS.BAD_FORMAT' }
    ];

    this.validationMessages[UserFormKey.PASSWORD] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[UserFormKey.CONFIRM_PASSWORD] = [
      { type: ValidationType.CONFIRM_PASSWORD_NOT_MATCH, message: 'COMMON.FORMS.ERRORS.BAD_PASSWORD_CONFIRM' }
    ];

    this.validationMessages[UserFormKey.PHONE_NUMBER] = [
      { type: ValidationType.FORMAT, message: 'COMMON.FORMS.ERRORS.BAD_FORMAT' }
    ];
  }

  private _getFormGroupControls(user: User) {
    const controls = {};

    controls[UserFormKey.FIRST_NAME] = new FormControl(user ? user.firstName : '', [Validators.required]);
    controls[UserFormKey.LAST_NAME] = new FormControl(user ? user.lastName : '', [Validators.required]);
    controls[UserFormKey.BIRTHDATE] = new FormControl(user && user.birthdate ? user.birthdate.toISOString() : null, [Validators.required], UserValidator.checkBirthdateValidity);
    controls[UserFormKey.EMAIL] = new FormControl(user ? user.email : '', [Validators.required, Validators.email]);
    controls[UserFormKey.JOB_ID] = new FormControl(user && user.jobId ? user.jobId : '', [Validators.required]);
    controls[UserFormKey.PROFILE_PICTURE] = new FormControl(null);
    controls[UserFormKey.SSH_PRIVATE] = new FormControl('');
    controls[UserFormKey.SSH_PUBLIC] = new FormControl('');
    controls[UserFormKey.EXPIRATION_DATE] = new FormControl(user && user.expirationDate ? user.expirationDate.toISOString() : null, [], UserValidator.checkExpirationDateValidity);
    controls[UserFormKey.IS_DISABLED] = new FormControl(user ? user.isDisabled : false);
    controls[UserFormKey.PASSWORD] = new FormControl('', !this.isUpdate ? [Validators.required] : []);
    controls[UserFormKey.CONFIRM_PASSWORD] = new FormControl('', [], (c: AbstractControl) => UserValidator.checkPasswordAndConfirmPasswordValue(c, UserFormKey.PASSWORD));
    controls[UserFormKey.GROUPS_IDS] = this.groupIdsForm;
    controls[UserFormKey.PHONE_NUMBERS] = this.phoneNumbersForm;

    return controls;
  }

  private _getNewPhoneFormGroup(type?: string, phone?: string): FormGroup {
    const controls = {};
    controls[UserFormKey.PHONE_TYPE] = new FormControl(type || this.phoneTypes[0]);
    controls[UserFormKey.PHONE_NUMBER] = new FormControl(phone || '', [Validators.pattern(this.PHONE_VALIDATOR)]);

    const formGroup = new FormGroup(controls);

    formGroup.get(UserFormKey.PHONE_NUMBER).valueChanges.subscribe(
      (value: string) => this._phoneValueChangeCallback(formGroup, value)
    );

    return formGroup;
  }

}
