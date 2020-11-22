import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Route[] = [
  {
    path: '',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class AuthenticationModule { }
