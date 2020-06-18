import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLayoutComponent } from './application-layout/application-layout.component';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { ClarityModule } from '@clr/angular';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { ImmediateExecutionComponent } from './modal-window/immediate-execution/immediate-execution.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingExecutionComponent } from './modal-window/pending-execution/pending-execution.component';
import { FloatingPointNumberDirective } from './directive/floating-point-number.directive';
import { OutputGraphComponent } from './output-graph/output-graph.component';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from "highcharts-angular";
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { TransactionsHistoryComponent } from './account-layout/transactions-history/transactions-history.component'
import { AccountRoutingModule } from './account-routing.module';
import { TransactionsStatisticComponent } from './account-layout/transactions-statistic/transactions-statistic.component';
import { ChangePasswordComponent } from './account-layout/change-password/change-password.component';
import { BalanceComponent } from './account-layout/balance/balance.component';
import { PositionComponent } from './position/position.component';

@NgModule({
  declarations: [
    ApplicationLayoutComponent,
    SidenavComponent,
    ModalWindowComponent,
    ImmediateExecutionComponent,
    PendingExecutionComponent,
    FloatingPointNumberDirective,
    OutputGraphComponent,
    AccountLayoutComponent,
    TransactionsHistoryComponent,
    TransactionsStatisticComponent,
    ChangePasswordComponent,
    BalanceComponent,
    PositionComponent
  ],
  exports: [
    ApplicationLayoutComponent,
    SidenavComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    FormsModule,
    BrowserModule,
    HighchartsChartModule,
    AccountRoutingModule    
  ],
  providers: [
    
  ],
  entryComponents: [
    ModalWindowComponent
  ]
})
export class LayoutModule { }
