import { NgModule, ModuleWithProviders, Provider, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from './token-auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { TokenAuthInterceptorService } from './token-auth-interceptor.service';
import { TokenStorageService } from './token-storage.service';
import { TokenAuthConfigService } from './token-auth-config.service';

export * from './token-auth.service';
export * from './token-auth-config.abstract';
export * from './token-auth-config.service';

export const TOKEN_SERVICE_PROVIDER = { provide: TokenAuthConfigService, useClass: TokenAuthConfigService };

export const CUSTOM_HTTP_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenAuthInterceptorService,
  multi: true
};

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
        tokenAuthConfig || TOKEN_SERVICE_PROVIDER,
        CUSTOM_HTTP_INTERCEPTOR
      ]
    };
  }
}
