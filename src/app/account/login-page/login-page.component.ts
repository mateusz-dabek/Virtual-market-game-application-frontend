import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RedirectService } from 'src/app/core/redirect/redirect.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private redirectService: RedirectService) {
  }
  
  ngOnInit() {
    this.buildForm();
  }

  private login() {
    const userCredentialsData = this.loginForm.value;
    this.authService.login(userCredentialsData)
      .subscribe(
        () => {
          this.redirectService.redirectToExchangePage();
        },
        err => {
          ToastService.error('Error',  err.error.errorMessage);
        });
  }


  private buildForm() {
    this.loginForm = this.formBuilder.group(({
      email: [''],
      password: ['']
    }));
  }

  private resetPassword() {
    this.redirectService.redirectToPasswordResetForm();
  }

  private register() {
    this.redirectService.redirectToRegisterPage();
  }
}
