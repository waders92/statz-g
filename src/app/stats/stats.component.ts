import { Component, OnInit } from '@angular/core';
import { RoundLogicService } from '../services/round-logic.service';
import { IRound } from '../new-round/models/round';
import { StatsLogicService } from '../services/stats-logic-service';
import { IStatDisplayPackage } from './models/stat-display-package';
import { StatDisplayPackageEnum } from './models/stat-display-package-enum';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  public statPackageEnum = StatDisplayPackageEnum;
  public rounds: IRound[];
  public statsPackage: IStatDisplayPackage;

  constructor(private logicService: RoundLogicService, private statsService: StatsLogicService) { }

  ngOnInit() {
    this.logicService.getRounds().subscribe((data) => {
      this.rounds = data;
      this.statsPackage = this.statsService.setupStatCategoriesForDisplay(this.rounds);
      console.log(this.statsPackage);
    });
  }
}
