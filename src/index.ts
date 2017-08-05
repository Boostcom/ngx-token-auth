import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from './token-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenAuthInterceptorService } from './token-auth-interceptor.service';
import { TokenStorageService } from './token-storage.service';
import { TokenAuthConfigService } from './token-auth-config.service';

export * from './token-auth.service';
export * from './token-auth-config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class TokenAuthModule {
  static forRoot(tokenAuthConfigService: Provider): ModuleWithProviders {
    return {
      ngModule: TokenAuthModule,
      providers: [
        TokenAuthService,
        TokenAuthInterceptorService,
        TokenStorageService,
        tokenAuthConfigService || { provide: TokenAuthConfigService, useClass: TokenAuthConfigService }
      ]
    };
  }
}
