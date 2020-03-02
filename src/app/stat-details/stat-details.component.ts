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

  constructor(private modalController: ModalController) { }

  public title: string;
  public statDetails: IStatPackageAverages;

  ngOnInit() {
    this.title = this.statDetails.statTitle;
  }

  cancel() {
    this.modalController.dismiss();
  }
}
