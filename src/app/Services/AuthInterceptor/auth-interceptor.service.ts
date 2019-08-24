import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Services/LoginAuth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService : AuthService) { }

  intercept(req, next) {
    var token = this._authService.checkUserStatus();
    var authRequest = req.clone({
      headers : new HttpHeaders().set('authtoken', token)

    })
    return next.handle(authRequest);
  }
}
