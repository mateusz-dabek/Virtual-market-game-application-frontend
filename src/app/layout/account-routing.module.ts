import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsHistoryComponent } from './account-layout/transactions-history/transactions-history.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { TransactionsStatisticComponent } from './account-layout/transactions-statistic/transactions-statistic.component';
import { ChangePasswordComponent } from './account-layout/change-password/change-password.component';
import { BalanceComponent } from './account-layout/balance/balance.component';
import { AuthGuardService } from '../core/auth/auth-guard.service';

const routes: Routes = [

  {
    path: 'account',
    component: AccountLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'history', component: TransactionsHistoryComponent},
      {path: 'statistic', component: TransactionsStatisticComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'balance', component: BalanceComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
