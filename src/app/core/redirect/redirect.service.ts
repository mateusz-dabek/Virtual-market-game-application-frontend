import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  public redirectToHomePage(): void {
    this.router.navigate([environment.routerPaths.homePage]);
  }

  public redirectToLoginPage(): void {
    this.router.navigate([environment.routerPaths.login]);
  }

  public redirectToRegisterPage(): void {
    this.router.navigate([environment.routerPaths.register])
  }

  public redirectToPasswordResetForm(): void {
    this.router.navigate([environment.routerPaths.resetPasswordPage]);
  }

  public redirectToExchangePage(): void {
    this.router.navigate([environment.routerPaths.exchange]);
  }

  public redirectToAccountPage(): void {
    this.router.navigate([environment.routerPaths.account]);
  }
}
