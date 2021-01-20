import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { GroupEditComponent } from './group-edit.component';

const routes: Route[] = [
  {
    path: '',
    component: GroupEditComponent
  }
];

@NgModule({
  declarations: [GroupEditComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule
  ]
})
export class GroupEditModule { }
