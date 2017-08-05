export class TokenAuthConfig {
  public oAuthBase? = window.location.origin;
  public oAuthApiPath? = 'api/auth';
  public oAuthCallbackUrl? = `${this.oAuthBase}/callback`;
  /**
   * Only sameWindow is supported currently.
   * @type {string}
   */
  public oAuthType?: 'sameWindow' | 'newWindow' = 'sameWindow';

  constructor(configuration?: TokenAuthConfig) {
    if (!configuration) { return; }

    Object.keys(configuration).forEach((paramKey) => this[paramKey] = configuration[paramKey]);
  }
}
