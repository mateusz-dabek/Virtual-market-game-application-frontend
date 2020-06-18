import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginPageComponent } from './account/login-page/login-page.component';
import { LoginGuardService } from './core/auth/login-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ResetPasswordTokenComponent } from './account/reset-password-token/reset-password-token.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { ApplicationLayoutComponent } from './layout/application-layout/application-layout.component';
import { RegistractionPageComponent } from './account/registraction-page/registraction-page.component';


const routes: Routes = [
  {
    // <-- COMPODOS NIE KOMPILUJE GDY PATH JEST JAKO STALA -->
    // path: environment.routerPaths.login,
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuardService]
  },
  {
    // path: environment.routerPaths.register,
    path: 'register',
    component: RegistractionPageComponent,
    canActivate: [LoginGuardService]
  },
  {
    // path: environment.routerPaths.homePage,
    path: '',
    component: LoginPageComponent,
    canActivate: [LoginGuardService]
  },
  {
    // path: environment.routerPaths.exchange,
    path: 'exchange',
    component: ApplicationLayoutComponent,
    canActivate: [AuthGuardService]
  },

  {
    // path: environment.routerPaths.resetPasswordPage,
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [LoginGuardService] 
  },
  {
    // path: environment.routerPaths.resetPasswordTokenPage,
    path: 'reset-password/:id',
    component: ResetPasswordTokenComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
