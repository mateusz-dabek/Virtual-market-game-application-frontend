import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RedirectService } from 'src/app/core/redirect/redirect.service';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {

  constructor(private auth: AuthService, private redirect: RedirectService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  trading() {
    this.redirect.redirectToExchangePage();
  }

  account() {
    this.redirect.redirectToAccountPage();
  }
}
