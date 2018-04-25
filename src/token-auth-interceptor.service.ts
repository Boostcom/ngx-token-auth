import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthData, TokenStorageService } from './token-storage.service';
import { TokenAuthConfigService } from './token-auth-config.service';
import 'rxjs/add/operator/do'

@Injectable()
export class TokenAuthInterceptorService implements HttpInterceptor {

  constructor(private authTokenStorage: TokenStorageService, private config: TokenAuthConfigService) {
    if (this.config.debugMode) { console.log('[AUTH] Starting interceptor'); }
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeaders = this.authTokenStorage.getCurrentAuthHeaders();

    if (this.config.debugMode) { console.log('[AUTH] Current data', authHeaders); }

    if (!authHeaders) { return next.handle(req); }

    const authReq = req.clone({ setHeaders: authHeaders });

    return next.handle(authReq)
      .do((event) => this.handleResponseEvent(event), (event) => this.handleResponseEvent(event));
  }

  private handleResponseEvent(event: HttpEvent<any>) {
    if (!event.hasOwnProperty('headers')) { return; }

    const responseHeaders = <HttpHeaders> event['headers'];
    if (!responseHeaders.has('access-token')) { return; }

    const authData: AuthData = {};
    TokenStorageService.AUTH_KEYS.forEach((key) => {
      authData[key] = responseHeaders.get(TokenStorageService.AUTH_HEADERS_MAPPING[key] || key);
    });

    if (this.config.debugMode) { console.log('[AUTH] New data', authData); }

    if (!this.authTokenStorage.isAuthDataValid(authData)) { return; }

    if (this.config.debugMode) { console.log('[AUTH] Successfully passed checks!') }

    this.authTokenStorage.loadAuthData(authData);
  }
}
