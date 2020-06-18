import { Component, OnInit } from '@angular/core';
import { OpenPosition, PendingPosition } from '../model/position';
import { ExchangeOrdersService } from '../services/exchange-orders.service';
import { UsernameService } from 'src/app/account/services/username.service';
import { ExchangeDataService } from '../services/exchange-data.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  balance: number;
  openPositions: OpenPosition[];
  pendingPositions: PendingPosition[];

  constructor(
    private exchangeOrders: ExchangeOrdersService, private exchangeData: ExchangeDataService) { } // exchangeData jest wykorzystywane w szablonie

  ngOnInit() {
    this.balance = UsernameService.getBalance();
    this.exchangeOrders.requestOpenPositions();
    this.exchangeOrders.openPositionsObs.subscribe((openPositions => this.openPositions = openPositions));
    this.exchangeOrders.requestPendingPositions();
    this.exchangeOrders.pendingPositionsObs.subscribe((pendingPositions => this.pendingPositions = pendingPositions));
  }

  closeOpenPosition(id: number) {
    this.exchangeOrders.closeOpenPosition(id);
  }

  closePendingPosition(id: number) {
    this.exchangeOrders.closePendingPosition(id);
  }

  getBalance() {
    return UsernameService.getBalance();
  }

  
}
