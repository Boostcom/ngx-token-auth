import { Injectable } from '@angular/core';

@Injectable()
export class TokenAuthConfigService {
  /**
   * Path used as host for redirection.
   * @type {string}
   */
  public oAuthBase? = window.location.origin;
  /**
   * Path for OAuth mount.
   * @type {string}
   */
  public oAuthApiPath? = 'api';
  public oAuthCallbackUrl? = `${this.oAuthBase}/callback`;
  public apiHost? = window.location.origin;
  public apiBasePath? = 'api/auth';
  public validateTokenPath? = `${this.apiBasePath}/validate_token`;
  public signInPath? = `${this.apiBasePath}/sign_in`;
  public signOutPath? = `${this.apiBasePath}/sign_out`;
  public registerPath? = `${this.apiBasePath}`;
  public deletePath? = `${this.apiBasePath}`;
  public updatePasswordPath? = `${this.apiBasePath}`;
  public resetPasswordPath? = `${this.apiBasePath}/password`;
  /**
   * Only sameWindow is supported currently.
   * @type {string}
   */
  public oAuthType?: 'sameWindow' | 'newWindow' = 'sameWindow';

  constructor(configuration?: TokenAuthConfigService) {
    if (!configuration) { return; }

    Object.keys(configuration).forEach((paramKey) => this[paramKey] = configuration[paramKey]);
  }
}
