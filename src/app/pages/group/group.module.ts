import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Route[] = [
  {
    path: '',
    component: GroupComponent
  }
];

@NgModule({
  declarations: [GroupComponent],
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
export class GroupModule { }
