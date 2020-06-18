import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OpenPositionHistory, SymbolStatistic } from '../model/position';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeHistoryService {
  // transactionsHistory: OpenPositionHistory[];

   transactionsHistory: Subject<OpenPositionHistory[]> = new Subject<OpenPositionHistory[]>();
   transactionsHistoryObs: Observable<OpenPositionHistory[]> = this.transactionsHistory.asObservable();

  //  symbolStatistic: Subject<SymbolStatistic[]> = new Subject<SymbolStatistic[]>();
  //  symbolStatisticObs = this.symbolStatistic.asObservable();

  constructor(private http: HttpClient) {
  }

  requestTransactionsHistory() {
    this.http.get<OpenPositionHistory[]>(environment.endpoints.apiPath + environment.endpoints.transactionsHistory)
      .subscribe(transactionsHistory => this.transactionsHistory.next(transactionsHistory));
  }



}
