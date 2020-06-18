import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RedirectService } from 'src/app/core/redirect/redirect.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private redirectService: RedirectService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.resetForm = this.formBuilder.group(({
      email: ['']
    }));
  }


  public resetPassword() {
    const emails = this.resetForm.value;
    if (this.checkEmails()) {
      const resetPath =
        environment.endpoints.apiPath +
        environment.endpoints.passwordResetPath + '/' + emails.email;

      this.http.post<any>(resetPath, null).subscribe(
        () => {
          ToastService.success('Success', 'The password reset link has been sent');
          this.redirectService.redirectToLoginPage();
        },
        err => {
          if (err.status === 404) {
            ToastService.error('Error', err.error.errorMessage);
          } else if (err.status === 409) {
            ToastService.error('Error', err.error.errorMessage);
          }
        }
      );
    }
  }

  public checkEmails(): boolean {
    const emails = this.resetForm.value;
    return emails.email.length > 0;
  }
  //  && emails.confirmEmail.length > 0 && emails.email === emails.confirmEmail

}
