import { Injectable } from '@angular/core';
import { RedirectService } from '../redirect/redirect.service';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private redirectService: RedirectService,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log(this.authService.isAuthenticated())
    if (this.authService.isAuthenticated()) {
      // console.log('Auth guard true');
      
      return true;
    }
    if (JwtTokenService.getToken()) {
      JwtTokenService.removeToken();
    }
    this.redirectService.redirectToLoginPage();
    // console.log('Auth guard false');
    return false;
  }
}
