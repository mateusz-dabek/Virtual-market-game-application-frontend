import { Component, OnInit, ViewChild } from '@angular/core';
import { Forex } from '../../model/forex';
import { ExchangeDataService } from '../../services/exchange-data.service';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ExchangeGraphService } from '../../services/exchange-graph.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  loading: boolean = true;
 
  private forex: Forex[];
  
  @ViewChild(ModalWindowComponent, { static: false })
  modalWindow: ModalWindowComponent;

  constructor(private exchangeData: ExchangeDataService,
    private exchangeGraph: ExchangeGraphService) { }

  ngOnInit() {
    // console.log('start SidenavComponent oninit');
    // this.exchangeData.getForex().subscribe(data => this.forex = data);
    // this.forex = this.exchangeData.getForex();
    // if (this.exchangeData.isStreamClose() == 2) { // 0 - łączenie | 1 - otwarty | 2 - zamkniety
    console.log('ponawiam polaczenie');
    this.exchangeData.observeMessage().subscribe();
    this.refresh2();
    // console.log('end SidenavComponent oninit');
  }

  refresh2() {
    setInterval(() => {
      this.forex = this.exchangeData.getForex();
    }, 1000)
  }

  showWindow(event, symbol) {
    this.exchangeData.lastSelectedSymbol = symbol;
    this.modalWindow.basic = true;
  }


  reloadChart(event, symbol) {
    this.exchangeData.lastSelectedSymbol = symbol;
    this.exchangeGraph.requestCandlestickGraph("PERIOD_D1");
  }

  refresh() {
    if (this.forex) {
      this.loading = false;
    }
  }

}
