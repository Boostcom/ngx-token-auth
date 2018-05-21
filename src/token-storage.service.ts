import { Injectable } from '@angular/core';

export interface AuthData {
  accessToken?: string;
  client?: string;
  expiry?: string;
  tokenType?: string;
  uid?: string;
}

@Injectable()
export class TokenStorageService {
  public static readonly AUTH_KEYS = ['accessToken', 'client', 'expiry', 'tokenType', 'uid'];
  public static readonly AUTH_HEADERS_MAPPING = { accessToken: 'access-token', tokenType: 'token-type' };
  public authData: AuthData;

  constructor() {
    this.loadAuthData();
  }

  public getCurrentAuthHeaders(): { [name: string]: string } {
    if (!this.authData) { return null; }

    const authHeaders = {};

    TokenStorageService.AUTH_KEYS.forEach((key) => {
      authHeaders[TokenStorageService.AUTH_HEADERS_MAPPING[key] || key] = this.authData[key];
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
    TokenStorageService.AUTH_KEYS.forEach((key) => localStorage.setItem(key, this.authData[key]));
  }

  public purge(): void {
    TokenStorageService.AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
    this.authData = null;
  }

  public isAuthDataValid(authData: AuthData): boolean {
    if (!TokenStorageService.AUTH_KEYS.every((key) => authData[key] != null)) { return false; }
    if (this.authData == null) { return true; }

    return +authData.expiry >= +this.authData.expiry;
  }

  private loadAuthDataFromParam(authData: AuthData) {
    this.authData = authData;
    this.saveCurrentAuthData();
  }

  private loadAuthDataFromStorage() {
    const authData: AuthData = {};
    TokenStorageService.AUTH_KEYS.forEach((key) => authData[key] = localStorage.getItem(key));

    if (!authData || !this.isAuthDataValid(authData)) { return; }

    this.authData = authData;
  }
}
