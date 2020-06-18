import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import HIndicatorsAll from "highcharts/indicators/indicators-all";
import HDragPanes from "highcharts/modules/drag-panes";
import HAnnotationsAdvanced from "highcharts/modules/annotations-advanced";
import HPriceIndicator from "highcharts/modules/price-indicator";
import HFullScreen from "highcharts/modules/full-screen";
import HStockTools from "highcharts/modules/stock-tools";
import { ExchangeGraphService } from '../services/exchange-graph.service';
import { Graph } from '../model/forex';

HIndicatorsAll(Highcharts);
HDragPanes(Highcharts);
HAnnotationsAdvanced(Highcharts);
HPriceIndicator(Highcharts);
HFullScreen(Highcharts);
HStockTools(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  candlestickData: Graph[];

  constructor(private exchangeGraph: ExchangeGraphService
    // jsonp: Jsonp,
    // private socketservice: SocketService,
    // private commonservice: CommonService
  ) {

  };

  ngOnInit() {
    this.exchangeGraph.requestCandlestickGraph("PERIOD_D1");
    this.exchangeGraph.candlestickDataObs.subscribe(candleStick => {
      this.candlestickData = candleStick;
      this.showChart();
    });
  }

  @ViewChild("container", { read: ElementRef, static: false }) container: ElementRef;
 
  showChart() {

    let ohlc = [];
    let volume = [];
    let dataLength = this.candlestickData.length;

    for (let i = 0; i < dataLength; i += 1) {
      ohlc.push([
        this.candlestickData[i].ctm, // the date
        this.candlestickData[i].open, // open
        this.candlestickData[i].high, // high
        this.candlestickData[i].low, // low
        this.candlestickData[i].close // close
      ]);

      volume.push([
        this.candlestickData[i].ctm, // the date
        this.candlestickData[i].vol  // the volume
      ]);
    }
    // this.container.nativeElement
    Highcharts.stockChart(this.container.nativeElement, {
      yAxis: [{
        labels: {
          align: 'left'
        },
        height: '80%',
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'left'
        },
        top: '80%',
        height: '20%',
        offset: 0
      }],

      tooltip: {
        shape: 'square',
        headerShape: 'callout',
        borderWidth: 0,
        shadow: false,
        positioner: function (width, height, point) {
          var chart = this.chart,
            position;

          if (point.isHeader) {
            position = {
              x: Math.max(
                // Left side limit
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
                  // Right side limit
                  chart.chartWidth - width - chart.marginRight
                )
              ),
              y: point.plotY
            };
          } else {
            position = {
              // x: point.series.chart.plotLeft,
              // y: point.series.yAxis.top - chart.plotTop
            };
          }

          return position;
        }
      },

      series: [{
        type: 'candlestick',
        id: 'aapl-ohlc',
        name: this.exchangeGraph.getLastSymbol(),
        data: ohlc
      }, {
        type: 'column',
        id: 'aapl-volume',
        name:  this.exchangeGraph.getLastSymbol() + ' Volume',
        data: volume,
        yAxis: 1
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 800
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false
            }
          }
        }]
      }
    });
  }

}