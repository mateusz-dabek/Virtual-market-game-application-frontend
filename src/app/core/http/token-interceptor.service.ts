import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { JwtTokenService } from '../auth/jwt-token.service';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { RedirectService } from '../redirect/redirect.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  private blackList = [environment.endpoints.apiPath + environment.endpoints.loginPath,
    environment.endpoints.apiPath + environment.endpoints.passwordResetPath,
    environment.endpoints.apiPath + environment.endpoints.registerPath,
    environment.endpoints.apiPath + environment.endpoints.verifyPath
  ];
  readonly refreshBeforeExpiration = 20 * 60 * 1000;
  private lastRefresh: number;

  constructor(private http: HttpClient, private redirectService: RedirectService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const url of this.blackList) {
      if (req.url.includes(url)) {
        return next.handle(req);
      }
    }

    if (this.tokenNeedRefresh()) {
      this.renewToken();
    }

    const modified = req.clone(
      { setHeaders: {
        'Authorization': `Bearer ${JwtTokenService.getToken()}`
      } });
    
    return next.handle(modified)
    .pipe(tap(
      () => {
      },
      (err) => {
        if (err.status === 401) {
          this.authService.logout();
          ToastService.error('Error', 'Wrong Token');
        }
      }));
  }

  private renewToken(): void {
    this.http.get<any>(environment.endpoints.apiPath + environment.endpoints.refreshPath, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${JwtTokenService.getToken()}`
      })
    }).subscribe(response => {
      JwtTokenService.setToken(response['accessToken']);
      this.lastRefresh = undefined;
    }, (err) => {
      JwtTokenService.removeToken();
      // info('unauthorized'), expiredToken
      // this.router.navigate('login');
    });
  }

  public tokenNeedRefresh(): boolean {
    const token = JwtTokenService.getToken();
    const currentTime = new Date().getTime();
    const expirationTime = JwtTokenService.getExpirationTime().getTime();
    if (token == null || currentTime > expirationTime) {
      return false;
    }
    const refreshTime = expirationTime - this.refreshBeforeExpiration;
    if (currentTime > refreshTime && this.lastRefresh === undefined) {
      this.lastRefresh = currentTime;
      return true;
    }
    return false;
  }
}
