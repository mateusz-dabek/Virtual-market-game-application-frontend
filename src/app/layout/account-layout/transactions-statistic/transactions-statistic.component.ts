import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from "highcharts";
import { SymbolStatistic, OpenPositionHistory } from '../../model/position';
import { ExchangeHistoryService } from '../../services/exchange-history.service';

@Component({
  selector: 'app-transactions-statistic',
  templateUrl: './transactions-statistic.component.html',
  styleUrls: ['./transactions-statistic.component.scss']
})
export class TransactionsStatisticComponent implements OnInit {
  positionData: OpenPositionHistory[];
  statisticData: SymbolStatistic[];
  statisticDataSumDuplicate: SymbolStatistic[] = [];

  constructor(private exchangeHistory: ExchangeHistoryService) { }

  ngOnInit() {
    this.exchangeHistory.requestTransactionsHistory();
    this.exchangeHistory.transactionsHistoryObs.subscribe(positionsData => {
      this.positionData = positionsData;

      this.statisticData = this.positionData.map(item => ({
        symbol: item.symbol,
        profit: item.profit >= 0.0 ? item.profit : 0.0,
        loss: item.profit < 0.0 ? Math.abs(item.profit) : 0.0
      }));

      this.statisticData.forEach((statistic) => {
        let totalProfit = this.statisticData.filter(item => item.symbol === statistic.symbol)
          .reduce((total, currentValue) => total += currentValue.profit, 0);
        let totalLoss = this.statisticData.filter(item => item.symbol === statistic.symbol)
          .reduce((total, currentValue) => total += currentValue.loss, 0);

        if (!this.statisticDataSumDuplicate.includes(statistic)) {
          this.statisticDataSumDuplicate.push({ symbol: statistic.symbol, profit: totalProfit, loss: totalLoss });
        }
      })

      this.statisticDataSumDuplicate.sort((el1, el2) => {
        if (el1.profit - el1.loss < el2.profit - el2.loss) return 1;
        else if (el1.profit - el1.loss > el2.profit - el2.loss) return -1;
        else return 0;
      }
      );

      this.showChart();
    });
  }


  @ViewChild("container", { read: ElementRef, static: false }) container: ElementRef;

  showChart() {
    let profit = [];
    let loss = [];
    let dataLength = this.statisticDataSumDuplicate.length;

    for (let i = 0; i < dataLength; i += 1) {
      profit.push([
        this.statisticDataSumDuplicate[i].symbol,
        this.statisticDataSumDuplicate[i].profit // profit
      ]);

      loss.push([
        this.statisticDataSumDuplicate[i].symbol,
        this.statisticDataSumDuplicate[i].loss  // loss
      ])
    }




    Highcharts.chart(this.container.nativeElement, {
      // chart: {
      //   type: 'column'
      // },
      title: {
        text: 'Profit and loss all instruments'
      },
      subtitle: {
        text: 'Sorting from the most profitable instrument'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Usd'
        }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        pointFormat: 'Value: <b>{point.y:.1f} usd</b>'
      },
      colors: [
        '#7CB9E8',
        '#E06F00'
      ],


      series: [{
        type: 'column',
        name: 'Profit',
        data: profit,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF', // kolor czcionki
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '12px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }, {
        type: 'column',
        name: 'Loss',
        data: loss,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '12px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }
      ]
    });

  }

}
