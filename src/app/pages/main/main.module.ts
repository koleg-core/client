import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class MainModule { }
