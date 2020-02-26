import { Component, OnInit } from '@angular/core';
import { ISpecificStatPackage } from '../stats/models/specific-stat-package';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss'],
})
export class StatDetailsComponent {

  constructor(private modalController: ModalController) { }

  public title: string;
  public statDetails: ISpecificStatPackage[];

  cancel() {
    this.modalController.dismiss();
  }
}
