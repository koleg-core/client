import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UserCardComponent } from './user-card/user-card.component';
import { GroupCardComponent } from './group-card/group-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobFormComponent } from './job-form/job-form.component';

@NgModule({
  exports: [
    HeaderComponent,
    SearchbarComponent,
    UserCardComponent,
    GroupCardComponent,
    JobFormComponent,
  ],
  declarations: [
    HeaderComponent,
    SearchbarComponent,
    UserCardComponent,
    GroupCardComponent,
    JobFormComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
