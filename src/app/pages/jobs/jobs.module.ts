import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsComponent } from './jobs.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Route[] = [
  {
    path: '',
    component: JobsComponent
  }
];

@NgModule({
  declarations: [JobsComponent],
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
export class JobsModule { }
