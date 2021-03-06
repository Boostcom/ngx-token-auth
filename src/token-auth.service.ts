import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ParamMap } from '@angular/router';
import { TokenAuthConfigService } from './token-auth-config.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TokenAuthService {
  private currentUser: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService,
              private config: TokenAuthConfigService) {}

  /**
   * Sign in using login data
   * @returns {Observable<any>}
   */
  public signIn(): Observable<any> {
    return null;
  }

  /**
   * Register new account
   * @returns {Observable<any>}
   */
  public register(): Observable<any> {
    return null;
  }

  /**
   * Unregister (delete) current user
   * @returns {Observable<any>}
   */
  public unregister(): Observable<any> {
    return null;
  }

  /**
   * Updates current user password
   * @returns {Observable<any>}
   */
  public updatePassword(): Observable<any> {
    return null;
  }

  /**
   * Initiate password reset for user with given email
   * @returns {Observable<any>}
   */
  public resetPassword(): Observable<any> {
    return null;
  }

  /**
   * Initiate sign in using OAuth provider
   */
  public signInWithOAuth(provider: string): void {
    this.purgeSession();
    window.location.href = this.oAuthPathBuilder(provider);
  }

  /**
   * Sign out current user.
   * Local session will be purge even if backend won't return 200.
   * @returns {Observable<any>}
   */
  public signOut(): Observable<any> {
    return this.http
      .delete(`${this.config.apiHost}/${this.config.signOutPath}`).pipe(
        tap(() => this.purgeSession(), () => this.purgeSession())
      );
  }

  /**
   * Validate correctness and validity of token
   * @returns {Observable<any>}
   */
  public validateToken(): Observable<any> {
    return this.http.get(`${this.config.apiHost}/${this.config.validateTokenPath}`).pipe(
      tap((json) => this.currentUser = json['data']),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.config.signOutOnTokenValidationFail) {
          this.purgeSession();
          this.signOut();
        }

        return throwError(error);
      })
    )
  }

  /**
   * Process params after redirection from OAuth
   * @param {ParamMap} queryParams - route query params
   */
  public processOAuthParams(queryParams: ParamMap) {
    this.tokenStorage.loadAuthData({
      accessToken: queryParams.get('token') || queryParams.get('auth_token'),
      client: queryParams.get('client_id'),
      expiry: queryParams.get('expiry'),
      tokenType: 'Bearer',
      uid: queryParams.get('uid')
    });
  }

  private oAuthPathBuilder(provider: string): string {
    return `${this.config.oAuthBase}/${this.config.oAuthApiPath}/${provider}`
      + `?omniauth_window_type=${this.config.oAuthType}`
      + `&auth_origin_url=${encodeURIComponent(this.config.oAuthCallbackUrl)}`;
  }

  private purgeSession() {
    this.tokenStorage.purge();
    this.currentUser = null;
  }
}
