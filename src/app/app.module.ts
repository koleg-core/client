import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersApiMock } from './dal/users/users-api-mock';
import { UsersApiImpl } from './dal/users/users-api-impl';
import { GroupsApiMock } from './dal/groups/groups-api-mock';
import { GroupsApiImpl } from './dal/groups/groups-api-impl';
import { JobsApiMock } from './dal/jobs/jobs-api-mock';
import { AuthApiMock } from './dal/auth/auth-api-mock';
import { AuthApiImpl } from './dal/auth/auth-api-impl';
import { JobsApiImpl } from './dal/jobs/jobs-api-impl';
import { RouteReuseStrategy } from '@angular/router';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: 'UsersApiProtocol',
      useClass: environment.mock ? UsersApiMock : UsersApiImpl,
    },
    {
      provide: 'GroupsApiProtocol',
      useClass: environment.mock ? GroupsApiMock : GroupsApiImpl,
    },
    {
      provide: 'JobsApiProtocol',
      useClass: environment.mock ? JobsApiMock : JobsApiImpl,
    },
    {
      provide: 'AuthApiProtocol',
      useClass: environment.mock ? AuthApiMock : AuthApiImpl,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
