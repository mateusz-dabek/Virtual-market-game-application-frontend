import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RedirectService } from 'src/app/core/redirect/redirect.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-registraction-page',
  templateUrl: './registraction-page.component.html',
  styleUrls: ['./registraction-page.component.scss']
})
export class RegistractionPageComponent implements OnInit {
  confirmCode: boolean = false;
  public signUpForm: FormGroup;
  public verifyCode: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private redirectService: RedirectService,
    private http: HttpClient) { }

  ngOnInit() {
    this.buildForm();
  }

  private signUp() {
    const userCredentialsData = this.signUpForm.value;
    this.authService.register(userCredentialsData)
      .subscribe(
        (res) => {
          // this.redirectService.redirectToExchangePage()
          // this.http.post()
          this.confirmCode = true;
          ToastService.success('Success', 'Verification code has been sent');

        },
        (err) => {
          if (err.status === 403) {
            ToastService.error('Error', err.error.errorMessage);
          } else if (err.status === 409) {
            ToastService.error('Error', err.error.errorMessage);
          }
        });
  }

  private verificationCode() {
    console.log('verif');
    const verifyPath = environment.endpoints.apiPath + environment.endpoints.verifyPath;
    this.http.post<any>(verifyPath, { "verifyCode" : this.verifyCode.value.verificationCode })
      .subscribe(
        () => {
          this.confirmCode = false;
          this.redirectService.redirectToLoginPage();
          ToastService.success('Success', 'Account has been activated');
        },
        err => { 
          if (err.status === 403) {
            ToastService.error('Error', err.error.errorMessage);
          }
        }
      );  
      console.log('end');
  }

  private nextStep() {
    this.confirmCode = !this.confirmCode;
  }


  private buildForm() {
    this.signUpForm = this.formBuilder.group(({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    }));
    this.verifyCode = this.formBuilder.group(({
      verificationCode: ['']
    }))
  }
}
