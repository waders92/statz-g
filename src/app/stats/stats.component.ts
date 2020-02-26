import { Component, OnInit } from '@angular/core';
import { RoundLogicService } from '../services/round-logic.service';
import { IRound } from '../new-round/models/round';
import { StatsLogicService } from '../services/stats-logic-service';
import { IStatDisplayPackage } from './models/stat-display-package';
import { StatDisplayPackageEnum } from './models/stat-display-package-enum';
import { ModalService } from '../services/modal.service';
import { ISpecificStatPackage } from './models/specific-stat-package';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  public statPackageEnum = StatDisplayPackageEnum;
  public rounds: IRound[];
  public statsPackage: IStatDisplayPackage;

  constructor(private logicService: RoundLogicService, private statsService: StatsLogicService, private modalService: ModalService) { }

  ngOnInit() {
    this.logicService.getRounds().subscribe((data) => {
      this.rounds = data;
      this.statsPackage = this.statsService.setupStatCategoriesForDisplay(this.rounds);
    });
  }

  showSpecificStats(statType: string) {
    const specificStatPackage = this.statsService.getSpecificStatPackage(statType, this.rounds);
    this.modalService.presentStatDetails(specificStatPackage);
    // pass package to modalservice to display
    // create a component to give to modal service as reference
  }
}
