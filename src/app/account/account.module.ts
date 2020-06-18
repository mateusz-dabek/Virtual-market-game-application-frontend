import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistractionPageComponent } from './registraction-page/registraction-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegistractionPageComponent,
    ResetPasswordComponent,
    ResetPasswordTokenComponent
  ],
  exports: [
    LoginPageComponent,
    RegistractionPageComponent,
    ResetPasswordComponent,
    ResetPasswordTokenComponent
  ],

  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AccountModule { }
