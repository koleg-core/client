import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
    private translate: TranslateService
  ) { }

  async presentToast(message: string, params?: { [key: string]: string }): Promise<any> {
    return this._presentToast(message, params, 'medium');
  }

  async presentToastDanger(message: string = 'COMMON.ERRORS.FALLBACK', params?: { [key: string]: string }): Promise<any> {
    return this._presentToast(message, params, 'danger');
  }

  private async _presentToast(message: string, params?: { [key: string]: string }, color?: string): Promise<any> {
    const toast = await this.toastController.create({
      message: this.translate.instant(message, params),
      color,
      duration: environment.toastDuration,
    });
    toast.present();
    return toast.onDidDismiss();
  }
}
