import { Component, OnInit } from '@angular/core';
import { RoundLogicService } from '../services/round-logic.service';
import { IRound } from '../new-round/models/round';
import { StatsLogicService } from '../services/stats-logic-service';
import { IStatDisplayPackage } from './models/stat-display-package';
import { StatDisplayPackageEnum, StatDisplayPackageTitleEnum } from './models/stat-display-package-enum';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  public statPackageEnum = StatDisplayPackageEnum;
  public statPackageEnumTitle = StatDisplayPackageTitleEnum;
  public statsPackage18: IStatDisplayPackage;
  public statsPackage9: IStatDisplayPackage;
  public eighteenHoleRnds: IRound[];
  public nineHoleRnds: IRound[];

  constructor(private logicService: RoundLogicService, private statsService: StatsLogicService, private modalService: ModalService) { }

  ngOnInit() {
    this.logicService.getRounds().subscribe((data) => {
      this.eighteenHoleRnds = data.filter(x => !x.nineHoleRound);
      this.nineHoleRnds = data.filter(x => x.nineHoleRound);
      this.statsPackage18 = this.statsService.setupStatCategoriesForDisplay(this.eighteenHoleRnds);
      this.statsPackage9 = this.statsService.setupStatCategoriesForDisplay(this.nineHoleRnds, true);
    });
  }

  showSpecificStats(statType: string, isNineHoleRnd: boolean = false, statDetailTitle: string) {
    let roundsToAppend: IRound[];
    let correctStatPackage: IStatDisplayPackage;
    isNineHoleRnd ? correctStatPackage = this.statsPackage9 : correctStatPackage = this.statsPackage18;
    isNineHoleRnd ? roundsToAppend = this.nineHoleRnds : roundsToAppend = this.eighteenHoleRnds;
    const specificStatPackage = this.statsService.getSpecificStatPackage(statType, roundsToAppend);
    let appendedSpecificStatPackage = this.statsService.appendAverageToCategory(correctStatPackage, specificStatPackage);
    appendedSpecificStatPackage = this.statsService.appendPercentageOptionToCategory(appendedSpecificStatPackage);
    appendedSpecificStatPackage.statTitle = statDetailTitle;
    this.modalService.presentStatDetails(appendedSpecificStatPackage);
  }
}
