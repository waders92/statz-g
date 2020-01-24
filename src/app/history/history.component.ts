import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoundService } from '../services/round-service';
import { Subscription } from 'rxjs';
import { IRound } from '../new-round/models/round';
import { ModalController, Events, ToastController } from '@ionic/angular';
import { RoundLineItemComponent } from '../round-line-item/round-line-item.component';
import { roundPropertiesAndInputValues } from '../new-round/models/round-type-values';
import { NewRoundConverter } from '../new-round/converters/new-round-converter';
import * as moment from 'moment';


@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit, OnDestroy {

  public rounds: IRound[] = [];
  private roundSubscription = new Subscription();

  constructor(
    private roundService: RoundService,
    private modalController: ModalController,
    private roundConverter: NewRoundConverter,
    private events: Events,
    private toastCtrl: ToastController
    ) {}

  ngOnInit() {
    this.roundSubscription = this.roundService.getAllRounds().subscribe((data) => {
      this.rounds = data;
    });

    this.events.subscribe('new-round', (round) => {
      this.rounds.push(round);
    });
  }

  public async editRound(round: IRound) {
    const modal = await this.modalController.create({
      component: RoundLineItemComponent,
      componentProps: {
        roundItems: roundPropertiesAndInputValues(),
        roundData: round
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      if (data && data.data !== undefined) {
        const editedRound = this.roundConverter.convertRoundFromJson(data);
        this.roundService.updateRround(editedRound).subscribe((rnd) => {
          this.adjustViewableRound(rnd);
          this.showToastForEditedRound();
        });
      }
    });

    return await modal.present();
  }

  ngOnDestroy() {
    this.roundSubscription.unsubscribe();
    this.events.unsubscribe('new-round');
  }

  private async showToastForEditedRound(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Your round was edited and saved!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  private adjustViewableRound(round: any): void {
    const editedRounds = this.rounds.filter(x => x._id === round._id);
    if (editedRounds && editedRounds.length === 1) {
      const editedRound = editedRounds[0];
      editedRound.course = round.course;
      editedRound.fairwaysInReg = round.fairwaysInReg;
      editedRound.greensInReg = round.greensInReg;
      editedRound.totalPutts = round.totalPutts;
      editedRound.totalBirdies = round.totalBirdies;
      editedRound.totalPars = round.totalPars;
      editedRound.date = new Date(round.date);
    }
  }
}
