import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeDataService } from '../services/exchange-data.service';
import { PendingExecutionComponent } from './pending-execution/pending-execution.component';
import { ImmediateExecutionComponent } from './immediate-execution/immediate-execution.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImmediateExecution, PendingExecution } from '../model/position';
import { ExchangeOrdersService } from '../services/exchange-orders.service';
import { UsernameService } from 'src/app/account/services/username.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  public basic = false;
  private isImmediateExecution: boolean = true;
  private typePosition: string;

  @ViewChild(PendingExecutionComponent, { static: false })
  pendingExecutionComponent: PendingExecutionComponent;
  @ViewChild(ImmediateExecutionComponent, { static: false })
  immediateExecutionComponent: ImmediateExecutionComponent;

  immediateExecutionOrder: ImmediateExecution;
  pendingExecutionOrder: PendingExecution;

  constructor(private exchangeData: ExchangeDataService,
    private http: HttpClient,
    private exchangeOrders: ExchangeOrdersService,
    private username: UsernameService) { }

  ngOnInit() {
  }

  getSelectedSymbol() {
    return this.exchangeData.lastSelectedSymbol;
  }

  getSellMarket(): number {
    return this.exchangeData.getSymbolBid(this.getSelectedSymbol());

  }

  getBuyMarket(): number {
    return this.exchangeData.getSymbolAsk(this.getSelectedSymbol());
  }

  resetPriceInPendingOrder() {
    // Uwaga!! Musi zostać gdzieś wysłane żądanie z otwarciem pozycji
    this.pendingExecutionComponent.resetPrice = true;
  }

  immediatelyExecution() {
    this.immediateExecutionOrder = new class implements ImmediateExecution {
      symbol: string;
      typePosition: string;
      leverage: number;
      value: number;
    };

    this.immediateExecutionOrder.symbol = this.exchangeData.lastSelectedSymbol;
    this.immediateExecutionOrder.typePosition = this.typePosition;
    this.immediateExecutionOrder.leverage = this.immediateExecutionComponent.leverage;
    this.immediateExecutionOrder.value = this.immediateExecutionComponent.totalValue;

    this.http.post(environment.endpoints.apiPath + environment.endpoints.openPositionPath, this.immediateExecutionOrder).subscribe(
      () => {
        this.username.refreshBalaceUser();
        this.exchangeOrders.requestOpenPositions();
        ToastService.success('Success', 'Order has been accepted');
      }, err => {
        ToastService.info('Info', err.error.errorMessage);
      }
    );

  }

  pendiningExecution() {
    this.pendingExecutionOrder = new class implements PendingExecution {
      symbol: string;
      typePosition: string;
      leverage: number;
      value: number;
      priceExecute: number;
    }
    this.pendingExecutionOrder.symbol = this.exchangeData.lastSelectedSymbol;
    this.pendingExecutionOrder.typePosition = this.typePosition;
    this.pendingExecutionOrder.leverage = this.pendingExecutionComponent.leverage;
    this.pendingExecutionOrder.value = this.pendingExecutionComponent.totalValue;
    this.pendingExecutionOrder.priceExecute = this.pendingExecutionComponent.priceExecute;

    this.http.post(environment.endpoints.apiPath + environment.endpoints.pendingPositionPath, this.pendingExecutionOrder)
      .subscribe(
        () => {
          this.username.refreshBalaceUser();
          this.exchangeOrders.requestPendingPositions();
          ToastService.success('Success', 'Order has been accepted');
        }, err => {
          ToastService.info('Info', 'Insufficient balance');
        }
      );

  }


}
