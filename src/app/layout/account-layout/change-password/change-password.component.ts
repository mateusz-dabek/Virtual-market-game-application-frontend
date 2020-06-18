import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  show: boolean = true;
  public changeForm: FormGroup;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.changeForm = this.formBuilder.group(({
      oldPassword: [''],
      newPassword: ['']
    }));
  }


  changePassword() {
    const changePasswordPath = environment.endpoints.apiPath + environment.endpoints.usersPath + environment.endpoints.changePassword;
    let passwords = this.changeForm.value;
    this.http.post<any>(changePasswordPath, {"oldPassword" : passwords.oldPassword, "newPassword" : passwords.newPassword})
    .subscribe(
      () => { 
        ToastService.success('Success', 'Password has been changed')
      },
      err => {
        ToastService.error('Error', err.error.errorMessage);
       }
    )
  }
}
