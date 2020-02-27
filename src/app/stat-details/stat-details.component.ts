import { Component, OnInit } from '@angular/core';
import { ISpecificStatPackage } from '../stats/models/specific-stat-package';
import { ModalController } from '@ionic/angular';
import { StatsLogicService } from '../services/stats-logic-service';
import { IStatPackageAverages } from '../stats/models/stat-package-averages';

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss'],
})
export class StatDetailsComponent implements OnInit {

  constructor(private modalController: ModalController, private statService: StatsLogicService) { }

  public title: string;
  public statDetails: IStatPackageAverages;

  ngOnInit() {
    const tempTitle = this.statDetails.detailsPackage[0].statType;
    this.title = this.statService.populateDetailsTitle(tempTitle);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
