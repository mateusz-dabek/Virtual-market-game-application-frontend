import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RedirectService } from 'src/app/core/redirect/redirect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss']
})
export class ApplicationLayoutComponent implements OnInit {

  constructor(private auth: AuthService, private redirect: RedirectService, private router: Router) { }

  ngOnInit() {
  }

  private logout() {
    this.auth.logout();
  }

  private tradingPage() {
    if (this.router.url !== '/exchange') {
       this.redirect.redirectToExchangePage();
    }
  }

  private accountPage() {
    if (this.router.url !== '/account') {
    this.redirect.redirectToAccountPage();
    }
  }

}
