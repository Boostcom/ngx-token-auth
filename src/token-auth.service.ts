import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ParamMap } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenAuthService {
  private currentUser: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

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
   * @param {string} provider - identifier of configured OAuth provider
   */
  public signInWithOAuth(provider: string): Observable<any> {
    return null;
  }

  /**
   * Sign out current user
   * @returns {Observable<any>}
   */
  public signOut(): Observable<any> {
    this.tokenStorage.purge();
    this.currentUser = null;

    return this.http.delete('');
  }

  /**
   * Validate correctness and validity of token
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
}
