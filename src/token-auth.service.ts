import { Injectable } from '@angular/core';
import { AuthTokenStorage } from './auth-token-storage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ParamMap } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenAuthService {
  private currentUser: any;

  constructor(private http: HttpClient, private authTokenStorage: AuthTokenStorage) {}

  /**
   * Initiate sign in using OAuth provider.
   * @param {string} provider - identifier of configured OAuth provider
   */
  public signInWithOAuth(provider: string) {

  }

  /**
   * Validate correctness and validity of token.
   * @returns {Observable<any>}
   */
  public validateToken(): Observable<any> {
    return this.http.get('')
      .do((json) => this.currentUser = json['data'])
      .catch((error: HttpErrorResponse) => {
        if (error.status === 401) { this.signOut(); }

        return Observable.throw(error);
      })
  }

  public processOAuthParams(queryParams: ParamMap) {
    this.authTokenStorage.loadAuthData({
      accessToken: queryParams.get('token') || queryParams.get('auth_token'),
      client: queryParams.get('client_id'),
      expiry: queryParams.get('expiry'),
      tokenType: 'Bearer',
      uid: queryParams.get('uid')
    });
  }

  public signOut(): Observable<any> {
    this.authTokenStorage.purge();
    this.currentUser = null;

    return this.http.delete('');
  }
}
