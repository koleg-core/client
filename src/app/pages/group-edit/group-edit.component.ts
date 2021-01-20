import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiErrorCode } from 'src/app/enums/api-error-code.enum';
import { GroupFormKey } from 'src/app/enums/group-form-key.enum';
import { ValidationType } from 'src/app/enums/validation-type.enum';
import { Group, GroupProps } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { AbstractFormPage } from '../abstract-form-page/abstract-form-page';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent extends AbstractFormPage {

  public isUpdate = false;
  public isLoading = false;
  public group: Group = null;
  public descriptionMaxLength = Group.DESCRIPTION_MAX_LENGTH;
  public groupImage: string;
  public parentGroups: Group[] = [];
  public childrenGroups: Group[] = [];
  public groupFormKey = GroupFormKey;

  private _groupId: string;
  private _newGroupImage: string = null;
  private _groups: Group[] = [];
  private _chosenGroups: string[] = [];

  private readonly UUID_VALIDATOR = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
  private readonly MAX_FILE_SIZE = 4000000;

  constructor(
    private groupsService: GroupsService,
    private navController: NavController,
    private route: ActivatedRoute,
    private toastService: ToastService) {
    super();

    this.onFileLoaded = this.onFileLoaded.bind(this);
  }

  ionViewWillEnter() {
    this._groupId = this.route.snapshot.queryParams.id;

    this.isUpdate = this._groupId ? true : false;

    if (this.isUpdate) {
      this._getGroup();
    } else {
      this._getGroups();
    }
  }

  onClickBackButton() {
    this.navController.pop();
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.formGroup);

    if (this.formGroup.valid) {

      this.isLoading = true;

      const value = this.formGroup.value;

      const groupProps: GroupProps = {
        id: this._groupId,
        name: value[GroupFormKey.NAME],
        description: value[GroupFormKey.DESCRIPTION],
        parent: value[GroupFormKey.PARENT],
        children: Array.isArray(value[GroupFormKey.CHILDREN]) ? value[GroupFormKey.CHILDREN].filter(child => child ? true : false) : [],
        imageURL: value[GroupFormKey.IMAGE]
      };

      if (this.isUpdate) {
        this._updateGroup(groupProps);
      } else {
        this._addGroup(groupProps);
      }
    }
  }

  onClickResetParentGroupButton() {
    this.formGroup.get(GroupFormKey.PARENT).patchValue(null);
  }

  onClickUploadGroupImageAvatar() {
    const openFileDialog = document.createElement('input');
    openFileDialog.type = 'file';
    openFileDialog.accept = 'image/jpg, image/png, image/svg';
    openFileDialog.click();
    openFileDialog.addEventListener('change', (e) => {
      const target = e.target as any;
      const file = target.files[0];
      this.formGroup.get(GroupFormKey.IMAGE).markAsTouched({ onlySelf: true });
      if (file.size > this.MAX_FILE_SIZE) {
        this.formGroup.get(GroupFormKey.IMAGE).setErrors({ fileTooLarge: true });
      } else {
        this.formGroup.get(GroupFormKey.IMAGE).setErrors(null);
        this.formGroup.get(GroupFormKey.IMAGE).patchValue(file);
        this.formGroup.get(GroupFormKey.IMAGE).updateValueAndValidity();
        this._newGroupImage = file;
        const reader = new FileReader();
        reader.onload = this.onFileLoaded;
        reader.readAsDataURL(file);
      }
    });
  }

  onClickResetProfileButton() {
    this.groupImage = (this.group && this.group.imageURL) ? this.group.imageURL.toString() : null;
    this.formGroup.get(GroupFormKey.IMAGE).markAsUntouched();
    this.formGroup.get(GroupFormKey.IMAGE).patchValue(null);
    this.formGroup.get(GroupFormKey.IMAGE).updateValueAndValidity();
  }

  onFileLoaded(e: any) {
    this.groupImage = e.target.result;
  }

  private _updateGroup(groupProps: GroupProps) {
    this.groupsService.updateGroup(groupProps)
      .then(async () => {

        if (this._newGroupImage) {
          await this.groupsService.uploadGroupImage(this._groupId, this._newGroupImage);
        }

        this.toastService.presentToast('GROUP_EDIT_PAGE.UPDATE_SUCCESS');
        setTimeout(() => {
          this.navController.pop();
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        if (error?.error?.status === ApiErrorCode.CONFLICTING) {
          this.toastService.presentToastDanger('COMMON.ERRORS.GROUP_CONFLICT');
        } else {
          this.toastService.presentToastDanger();
        }
      })
      .finally(() => this.isLoading = false);
  }

  private _addGroup(groupProps: GroupProps) {
    this.groupsService.addGroup(groupProps)
      .then(async () => {

        if (this._newGroupImage) {
          await this.groupsService.uploadGroupImage(this._groupId, this._newGroupImage);
        }

        this.toastService.presentToast('GROUP_EDIT_PAGE.ADD_SUCCESS');
        setTimeout(() => {
          this.navController.pop();
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        if (error?.error?.status === ApiErrorCode.CONFLICTING) {
          this.toastService.presentToastDanger('COMMON.ERRORS.GROUP_CONFLICT');
        } else {
          this.toastService.presentToastDanger();
        }
      })
      .finally(() => this.isLoading = false);
  }

  private _getGroup() {
    this.isLoading = true;
    this.groupsService.getGroup(this._groupId)
      .then(group => {
        this.group = group;
        this.groupImage = this.group.imageURL.toString();
        this._getGroups();
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _getGroups() {
    this.groupsService.getGroups()
      .then(groups => {
        this._groups = groups;
        this.parentGroups = [...this._groups.filter(g => this.group ? this.group.id !== g.id : true)];
        this.childrenGroups = [...this._groups.filter(g => this.group ? this.group.id !== g.id : true)];
        this._initializeUserForm(this.group);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _initializeUserForm(group: Group): void {

    this.formGroup = new FormGroup(this._getFormGroupControls(group));

    this.formGroup.get(GroupFormKey.PARENT).valueChanges.subscribe(value => {
      this.childrenGroups = [...this._groups.filter(g => (this.group ? this.group.id !== g.id : true) && value !== g.id)];
    });

    this.formGroup.get(GroupFormKey.CHILDREN).valueChanges.subscribe((value: string[]) => {
      this.parentGroups = [...this._groups.filter(g => (this.group ? this.group.id !== g.id : true) && !value.includes(g.id))];
    });

    this._initValidationMessages();
  }

  private _getFormGroupControls(group: Group) {
    const controls = {};

    controls[GroupFormKey.NAME] = new FormControl(group ? group.name : '', [Validators.required]);
    controls[GroupFormKey.DESCRIPTION] = new FormControl(group ? group.description : '', [Validators.maxLength(this.descriptionMaxLength)]);
    controls[GroupFormKey.PARENT] = new FormControl(group ? group.parent : '', [Validators.pattern(this.UUID_VALIDATOR)]);
    controls[GroupFormKey.CHILDREN] = new FormControl(group ? group.name : '');
    controls[GroupFormKey.IMAGE] = new FormControl(null);
    controls[GroupFormKey.CHILDREN] = new FormControl(group ? group.children : []);

    return controls;
  }

  private _initValidationMessages() {
    this.validationMessages = {};

    this.validationMessages[GroupFormKey.NAME] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[GroupFormKey.DESCRIPTION] = [
      { type: ValidationType.MAX_LENGTH, message: 'COMMON.FORMS.ERRORS.MAX_LENGTH' }
    ];

    this.validationMessages[GroupFormKey.CHILD] = [
      { type: ValidationType.FORMAT, message: 'COMMON.FORMS.ERRORS.BAD_FORMAT' }
    ];

    this.validationMessages[GroupFormKey.IMAGE] = [
      { type: ValidationType.FILE_TOO_LARGE, message: 'COMMON.FORMS.ERRORS.FILE_TOO_LARGE' }
    ];
  }

}
