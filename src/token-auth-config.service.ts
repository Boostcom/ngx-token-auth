import { Injectable } from '@angular/core';
import { TokenAuthConfig } from './token-auth-config.abstract';

@Injectable()
export class TokenAuthConfigService extends TokenAuthConfig {
  constructor(configuration?: TokenAuthConfigService) {
    super();
    if (!configuration) { return; }

    Object.keys(configuration).forEach((paramKey) => this[paramKey] = configuration[paramKey]);
  }
}
