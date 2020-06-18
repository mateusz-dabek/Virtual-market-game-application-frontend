import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/account/services/username.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balance: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.balance = UsernameService.getBalance();
    this.balance = +this.balance.toFixed(2);
  }

  getBalance(): number {
    return UsernameService.getBalance();
  }

  changeBalance() {
    const balancePath =
      environment.endpoints.apiPath + environment.endpoints.usersPath + '/change_balance';

    this.http.post<any>(balancePath, {"newBalance" : this.balance})
      .subscribe(
        () => {
          UsernameService.setBalance(this.balance);
          // ToastService.success(this.languageService.translate('success'), this.languageService.translate('newPasswordSent'));
          // this.redirectService.redirectToLoginPage();
        },
        // err => ToastService.error(this.languageService.translate('error'), err.error.errorMessage)
        err => {}
      );
  }
}
