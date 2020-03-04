import { Component, OnInit } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { RoundLogicService } from '../services/round-logic.service';
import { IYearlyRounds } from '../stats/models/yearly-rounds';
import * as _ from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit {

  public rounds: IRound[];
  public availableYears: number[];
  public yearlyRounds: IYearlyRounds;
  public selectedYear: number;

  constructor(private logicService: RoundLogicService) {}

  ngOnInit() {
    this.logicService.getRounds().subscribe((data) => {
      this.rounds = data;
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;
      this.availableYears = this.logicService.getAvailableYears(this.rounds);
      this.yearlyRounds = this.logicService.getMonthlyRoundsByYear(this.rounds, currentYear);
    });
  }

  showSelectedYear(selectedYear: number) {
    this.selectedYear = selectedYear;
    this.yearlyRounds = this.logicService.getMonthlyRoundsByYear(this.rounds, selectedYear);
  }
}
