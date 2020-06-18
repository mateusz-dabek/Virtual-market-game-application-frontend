import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RedirectService } from '../redirect/redirect.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private redirectService: RedirectService) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      // console.log('login guard true');
      return true;
    }
    // this.redirectService.redirectToHomePage();
    // console.log('login guard false');
    this.redirectService.redirectToExchangePage();
    return false;
  }
}
