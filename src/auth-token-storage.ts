import { Injectable } from '@angular/core';

export interface AuthData {
  accessToken?: string;
  client?: string;
  expiry?: string;
  tokenType?: string;
  uid?: string;
}

@Injectable()
export class AuthTokenStorage {
  public static readonly AUTH_KEYS = ['accessToken', 'client', 'expiry', 'tokenType', 'uid'];
  public static readonly AUTH_HEADERS_MAPPING = { accessToken: 'access-token', tokenType: 'token-type' };
  public authData: AuthData;

  public getCurrentAuthHeaders(): { [name: string]: string } {
    if (!this.authData) { return null; }

    const authHeaders = {};

    AuthTokenStorage.AUTH_KEYS.forEach((key) => {
      authHeaders[AuthTokenStorage.AUTH_HEADERS_MAPPING[key] || key] = this.authData[key];
    });

    return authHeaders;
  }

  public loadAuthData(authData?: AuthData): void {
    if (authData) {
      if (this.isAuthDataValid(authData)) { this.loadAuthDataFromParam(authData); }
      return;
    }

    this.loadAuthDataFromStorage();
  }

  public saveCurrentAuthData(): void {
    AuthTokenStorage.AUTH_KEYS.forEach((key) => localStorage.setItem(key, this.authData[key]));
  }

  public purge(): void {
    AuthTokenStorage.AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
    this.authData = null;
  }

  public isAuthDataValid(authData: AuthData): boolean {
    if (!AuthTokenStorage.AUTH_KEYS.every((key) => authData[key] != null)) { return false; }
    if (this.authData == null) { return true; }

    return authData.expiry >= this.authData.expiry;
  }

  private loadAuthDataFromParam(authData: AuthData) {
    this.authData = authData;
    this.saveCurrentAuthData();
  }

  private loadAuthDataFromStorage() {
    const authData: AuthData = {};
    AuthTokenStorage.AUTH_KEYS.forEach((key) => authData[key] = localStorage.getItem(key));

    this.authData = authData;
  }
}
