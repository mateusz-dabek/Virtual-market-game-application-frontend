import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RedirectService } from 'src/app/core/redirect/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-reset-password-token',
  templateUrl: './reset-password-token.component.html',
  styleUrls: ['./reset-password-token.component.scss']
})
export class ResetPasswordTokenComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private redirectService: RedirectService,
    private router: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.resetForm = this.formBuilder.group(({
      password: [''],
      confirmPassword: ['']
    }));
  }


  public resetPassword() {
    this.router.params.subscribe(params => {
      
      const resetPath =
        environment.endpoints.apiPath + 
        environment.endpoints.passwordResetPath + '/validate/' + params["id"];
      if (this.checkPassword()) {
        this.http.post<any>(resetPath, {"password" : this.resetForm.value.password})
          .subscribe(
            () => {
              ToastService.success('Success', 'Password has been changed');
              this.redirectService.redirectToLoginPage();
            }, (err) => {
              if (err.status === 403) {
                ToastService.error('Error', err.error.errorMessage);
              }
            }
          );
      } else {
        ToastService.error('Error', 'Password not match');
      }

    });

  }

  public checkPassword(): boolean {
    const passwords = this.resetForm.value;
    return passwords.password.length > 0 && passwords.confirmPassword.length > 0 && passwords.password === passwords.confirmPassword;
  }
}
