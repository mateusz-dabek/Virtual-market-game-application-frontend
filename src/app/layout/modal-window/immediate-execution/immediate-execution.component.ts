import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/account/services/username.service';

@Component({
  selector: 'app-immediate-execution',
  templateUrl: './immediate-execution.component.html',
  styleUrls: ['./immediate-execution.component.scss']
})
export class ImmediateExecutionComponent implements OnInit {
  value: number;
  leverage: number = 1;
  totalValue: number = 1;


  constructor() { }

  ngOnInit() {

  }

  getTotalValue() {
    if (this.value === undefined)
      return 0;
    this.totalValue = this.leverage * this.value;
    return this.totalValue;
  }

  getBalance(): number {
    return UsernameService.getBalance();
  }

}
