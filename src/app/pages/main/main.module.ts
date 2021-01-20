import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { MainComponentRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MainComponentRoutingModule,
    TranslateModule
  ]
})
export class MainModule { }
