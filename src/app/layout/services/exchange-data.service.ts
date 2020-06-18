import { Injectable } from '@angular/core';
import { Forex } from '../model/forex';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {
  private es: EventSource;
  private forex: Forex[];
  private obs: Observable<any>;
  private _lastSelectedSymbol: string;

  constructor() {
    // console.log('ngOnInit from ExchangeDataService');
    // this.obs = this.observeMessage();
    // this.obs.subscribe();
  }

  public observeMessage(): Observable<any> {
    // console.log('start observeMessage() from ExchangeDataService');
    return new Observable<Forex>(obs => {
      this.es = new EventSource(environment.endpoints.apiPath + environment.endpoints.forexStream);
      this.es.addEventListener('message', (event: MessageEvent) => {
        // console.log('evt.data:\n ' + event.data);
        this.forex = JSON.parse(event.data); // parse raczej nie poczebne
        obs.next(event.data);
      });
      // return () => es.close();
    })
  }
  public closeMessage(): void {
    if (this.es !== undefined) {
      // console.log('Zamknieto strumien')
      this.es.close();
    }
  }

  getForex(): Forex[] {
    // return of(this.forex);
    // return Observable.create(this.forex);
    return this.forex;
  }

  getSymbolAsk(symbol: string): number {
    if (this.forex && symbol)
      return this.forex.find(s => s.symbol === symbol).ask;
  }

  getSymbolBid(symbol: string): number {
    if (this.forex && symbol)
      return this.forex.find(s => s.symbol === symbol).bid;
  }

  get lastSelectedSymbol(): string {
    return this._lastSelectedSymbol;
  }

  set lastSelectedSymbol(symbol: string) {
    this._lastSelectedSymbol = symbol;
  }

}
