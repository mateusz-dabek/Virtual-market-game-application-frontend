import { Component, OnInit } from '@angular/core';
import { ExchangeHistoryService } from '../../services/exchange-history.service';
import { OpenPositionHistory } from '../../model/position';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {
  transactionHistory: OpenPositionHistory[];

  constructor(private exchangeHistory: ExchangeHistoryService) { }

  ngOnInit() {
    this.exchangeHistory.requestTransactionsHistory();
    this.exchangeHistory.transactionsHistoryObs.subscribe(transactionsHistory => this.transactionHistory = transactionsHistory);
  }




}
