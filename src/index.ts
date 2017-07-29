import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from './token-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenAuthInterceptorService } from './token-auth-interceptor.service';
import { TokenStorageService } from './token-storage.service';

export * from './token-auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class TokenAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TokenAuthModule,
      providers: [TokenAuthService, TokenAuthInterceptorService, TokenStorageService]
    };
  }
}
