import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthData, AuthTokenStorage } from './auth-token-storage';
import 'rxjs/add/operator/do'

@Injectable()
export class TokenAuthInterceptorService implements HttpInterceptor {

  constructor(private authTokenStorage: AuthTokenStorage) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: this.authTokenStorage.getCurrentAuthHeaders() });

    return next.handle(authReq).do((event) => this.handleResponseEvent(event));
  }

  private handleResponseEvent(event: HttpEvent<any>) {
    if (!(event instanceof HttpHeaderResponse)) { return; }

    const responseHeaders = event.headers;

    const authData: AuthData = {};
    AuthTokenStorage.AUTH_KEYS.forEach((key) => {
      authData[key] = responseHeaders.get(AuthTokenStorage.AUTH_HEADERS_MAPPING[key] || key);
    });

    this.authTokenStorage.loadAuthData(authData);
  }
}
