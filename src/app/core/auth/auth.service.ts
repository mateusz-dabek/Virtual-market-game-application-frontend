import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtTokenService } from './jwt-token.service';
import { User } from 'src/app/user/model/user';
import { UsernameService } from 'src/app/account/services/username.service';
import { environment } from 'src/environments/environment';
import { RedirectService } from '../redirect/redirect.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ExchangeDataService } from 'src/app/layout/services/exchange-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private obs: Observable<any>;
  
  // @Output() emitAuthenticated: EventEmitter<any> = new EventEmitter(); // po co to jest?
  
  constructor(private http: HttpClient,
    private redirectService: RedirectService,
    private exchangeDataService: ExchangeDataService) { }

  public logout() {
    JwtTokenService.removeToken();
    UsernameService.removeFirstName();
    UsernameService.removeLastName();
    UsernameService.removeEmail();
    UsernameService.removeBalance();
    this.exchangeDataService.closeMessage()
    this.redirectService.redirectToLoginPage();
  }

  public isAuthenticated(): boolean {
    if (JwtTokenService.getToken() == null) {
      // console.log('token to null');
      return false;
    }
    const tokenExpiredTime = JwtTokenService.getExpirationTime();
    const now = Date.now();
    return (now < tokenExpiredTime.getTime());
  }

  public login(userCredentialsData: any): Observable<any> {
    const authPath = environment.endpoints.apiPath + environment.endpoints.loginPath;
    return this.http.post<any>(authPath, userCredentialsData)
      .pipe(
        tap((response) => {
          JwtTokenService.setToken(response['accessToken']);
          // console.log('Token: ' + JwtTokenService.getToken());
          const id = JwtTokenService.getIdFromToken();

          this.obs = this.exchangeDataService.observeMessage();
          this.obs.subscribe();

          this.http.get<User>(environment.endpoints.apiPath + environment.endpoints.usersPath + '/' + id)
            .subscribe((data) => {
              // console.log('User: ' + data);
              UsernameService.setEmail(data.email);
              UsernameService.setBalance(data.balance);
              UsernameService.setFirstName(data.firstName);
              UsernameService.setLastName(data.lastName);
            });
        })
      );
  }
  
  public register(userCredentialsData: any): Observable<any> {
    const authPath = environment.endpoints.apiPath + environment.endpoints.registerPath;
    return this.http.post<any>(authPath, userCredentialsData);
  }
}
