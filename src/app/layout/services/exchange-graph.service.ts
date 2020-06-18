import { Injectable } from '@angular/core';
import { Graph } from '../model/forex';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExchangeDataService } from './exchange-data.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeGraphService {
  lastSymbol: string = 'USDPLN';
  candlestickData: Subject<Graph[]> = new Subject<Graph[]>();
  candlestickDataObs: Observable<Graph[]> = this.candlestickData.asObservable();

  constructor(private http: HttpClient, private exchangeData: ExchangeDataService) { }

   requestCandlestickGraph(period: string) {
    let params;
    if (this.exchangeData.lastSelectedSymbol) {
      params = new HttpParams().set("symbol", this.exchangeData.lastSelectedSymbol).set("period", period);
    } else {
      params = new HttpParams().set("symbol", "USDPLN").set("period", period);
    }

    this.http.get<Graph[]>(environment.endpoints.apiPath + environment.endpoints.candlestickChart, { params: params })
      .subscribe(candlestickData => {
        if (this.exchangeData.lastSelectedSymbol)
          this.lastSymbol = this.exchangeData.lastSelectedSymbol;
        this.candlestickData.next(candlestickData);
      }
      );

  }

  getLastSymbol() {
    return this.lastSymbol;
  }
}
