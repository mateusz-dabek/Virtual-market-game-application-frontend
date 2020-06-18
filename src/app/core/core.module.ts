import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './http/token-interceptor.service';
import { JwtTokenService } from './auth/jwt-token.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginGuardService } from './auth/login-guard.service';
import { AuthService } from './auth/auth.service';
import { RedirectService } from './redirect/redirect.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    JwtTokenService,
    AuthService,

    AuthGuardService,
    LoginGuardService,

    RedirectService
  ]
})
export class CoreModule { }
