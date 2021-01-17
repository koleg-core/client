import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private navController: NavController
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.navController.navigateRoot('login');
        }
      })
    );
  }
}
