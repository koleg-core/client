import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: '',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class AuthenticationModule { }
