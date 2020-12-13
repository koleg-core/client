import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private translate: TranslateService,
    private navController: NavController
  ) { }

  onClickLogoutButton() {
    this._presentAlertConfirm();
  }

  private async _presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: this.translate.instant('HEADER_COMPONENT.LOGOUT_ALERT_MESSAGE'),
      buttons: [
        {
          text: this.translate.instant('COMMON.NO'),
          role: 'cancel'
        }, {
          text: this.translate.instant('COMMON.YES'),
          handler: () => this._logout()
        }
      ]
    });
    alert.present();
  }

  private _logout() {
    this.authenticationService.logout()
      .then(() => this.navController.navigateRoot('auth'));
  }
}
