import { Component } from '@angular/core';
import { ExchangeDataService } from '../../services/exchange-data.service';
import { UsernameService } from 'src/app/account/services/username.service';

@Component({
  selector: 'app-pending-execution',
  templateUrl: './pending-execution.component.html',
  styleUrls: ['./pending-execution.component.scss']
})
export class PendingExecutionComponent {
  resetPrice: boolean = true;

  value: number;
  priceExecute: number;
  leverage: number = 1;
  totalValue: number = 1;

  constructor(private exchangeData: ExchangeDataService) {}

  ngOnInit() {}

  getTotalValue() {
    if (this.value === undefined)
      return 0;
    this.totalValue = this.leverage * this.value;
    return this.totalValue;
  }

  getMarketPrice() {
    if (this.resetPrice) {
      return this.priceExecute = this.exchangeData.getSymbolAsk(this.exchangeData.lastSelectedSymbol);
    }
    return null;
  }

  notResetPrice() {
    this.resetPrice = false;
  }

  getBalance(): number {
    return UsernameService.getBalance();
  }

}
