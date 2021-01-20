import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

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
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
          },
          {
            path: 'details',
            children: [
              {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
              },
              {
                path: ':id',
                loadChildren: () => import('../user/user.module').then(m => m.UserModule)
              }
            ]
          },
          {
            path: 'edit',
            loadChildren: () => import('../user-edit/user-edit.module').then(m => m.UserEditModule)
          }
        ]
      },
      {
        path: 'jobs',
        loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule),
          },
          {
            path: 'details',
            children: [
              {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule)
              },
              {
                path: ':id',
                loadChildren: () => import('../job/job.module').then(m => m.JobModule)
              }
            ]
          },
          {
            path: 'edit',
            loadChildren: () => import('../job-edit/job-edit.module').then(m => m.JobEditModule)
          }
        ]
      },
      {
        path: 'groups',
        loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule),
          },
          {
            path: 'details',
            children: [
              {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule)
              },
              {
                path: ':id',
                loadChildren: () => import('../group/group.module').then(m => m.GroupModule)
              }
            ]
          },
          {
            path: 'edit',
            loadChildren: () => import('../group-edit/group-edit.module').then(m => m.GroupEditModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainComponentRoutingModule { }
