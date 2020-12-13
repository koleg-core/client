import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
      },
      {
        path: 'authentication',
        loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      }
    ]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
