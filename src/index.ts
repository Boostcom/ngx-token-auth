import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from './token-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenAuthInterceptorService } from './token-auth-interceptor.service';
import { TokenStorageService } from './token-storage.service';
import { TokenAuthConfig } from './token-auth-config';
import { CONFIG_TOKEN } from './tokens';

export * from './token-auth.service';
export * from './token-auth-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class TokenAuthModule {
  static forRoot(configFactory: () => TokenAuthConfig): ModuleWithProviders {
    return {
      ngModule: TokenAuthModule,
      providers: [
        TokenAuthService,
        TokenAuthInterceptorService,
        TokenStorageService,
        { provide: CONFIG_TOKEN, useFactory: configFactory }
      ]
    };
  }
}
