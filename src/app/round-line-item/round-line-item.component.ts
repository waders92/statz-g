import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoundStatCategories } from '../new-round/models/round-type-enums';
import { RoundLogicService } from '../services/round-logic.service';

@Component({
  selector: 'app-round-line-item',
  templateUrl: './round-line-item.component.html',
  styleUrls: ['./round-line-item.component.scss'],
})
export class RoundLineItemComponent implements OnInit {

  public roundItems;
  public roundData;
  public date;
  public isEdit = false;
  public statsDict: { [key: string]: number | string; } = {};


  constructor(private modalController: ModalController, private logicService: RoundLogicService) { }

  ngOnInit() {
    if (this.roundData) {
      this.isEdit = true;
      this.date = this.roundData.date;
      this.constructStatsDict();
    }
  }

  public trackByFn() {
  }

  public dismiss() {
    const isFormVerified = this.logicService.verifyInputs(this.statsDict, this.date);
    if (!isFormVerified) {
      alert('Must enter all values');
      return;
    }

    this.statsDict[RoundStatCategories.Date] = this.date;

    this.modalController.dismiss({
      dismissed: true,
      data: this.statsDict
    });
  }

  public cancel() {
    this.modalController.dismiss();
  }

  private constructStatsDict(): void {
    const round = this.roundData;
    this.statsDict[RoundStatCategories.Date] = round.date;
    this.statsDict[RoundStatCategories.Id] = round._id;
    this.statsDict[RoundStatCategories.Course] = round.course;
    this.statsDict[RoundStatCategories.Score] = round.score;
    this.statsDict[RoundStatCategories.FairwaysInReg] = round.fairwaysInReg;
    this.statsDict[RoundStatCategories.GreeensInReg ] = round.greensInReg;
    this.statsDict[RoundStatCategories.TotalBirdies] = round.totalBirdies;
    this.statsDict[RoundStatCategories.TotalPars] = round.totalPars;
    this.statsDict[RoundStatCategories.TotalPutts] = round.totalPutts;
  }
}
