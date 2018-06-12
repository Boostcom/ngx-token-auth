import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from './token-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { TokenAuthConfigService } from './token-auth-config.service';

export * from './token-auth.service';
export * from './token-auth-config';
export * from './token-auth-config.service';
export * from './token-storage.service';
export * from './token-auth-interceptor.service';

export const TOKEN_SERVICE_PROVIDER = { provide: TokenAuthConfigService, useClass: TokenAuthConfigService };

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class TokenAuthModule {
  static forRoot(tokenAuthConfig: Provider): ModuleWithProviders {
    return {
      ngModule: TokenAuthModule,
      providers: [
        TokenAuthService,
        TokenStorageService,
        tokenAuthConfig || TOKEN_SERVICE_PROVIDER
      ]
    };
  }
}
