import { Component, OnInit } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { RoundLogicService } from '../services/round-logic.service';
import { IYearlyRounds } from '../stats/models/yearly-rounds';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit {

  public rounds: IRound[];
  public yearlyRounds: IYearlyRounds[];

  constructor(private logicService: RoundLogicService) {}

  ngOnInit() {
    this.logicService.getRounds().subscribe((data) => {
      this.rounds = data;
      const roundsGroupedByYear = this.logicService.getYearlyRounds(this.rounds);
      this.yearlyRounds = this.logicService.buildIterable(roundsGroupedByYear);
    });
  }
}
