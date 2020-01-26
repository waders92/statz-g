import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { RoundService } from 'src/app/services/round-service';
import { IRound } from 'src/app/new-round/models/round';
import { ModalController, ToastController } from '@ionic/angular';
import { RoundLineItemComponent } from 'src/app/round-line-item/round-line-item.component';
import { NewRoundConverter } from 'src/app/new-round/converters/new-round-converter';
import { roundPropertiesAndInputValues } from 'src/app/new-round/models/round-type-values';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { UpdateRound } from 'src/app/actions/round.actions';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss'],
})
export class HistoryDetailsComponent implements OnInit {

  round: IRound;

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService,
    private modalController: ModalController,
    private roundConverter: NewRoundConverter,
    private toastCtrl: ToastController,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params._id !== undefined) {
        const id = params._id;
        this.roundService.getRoundById(id)
            .subscribe(round => this.round = round);
      }
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
          this.store.dispatch(new UpdateRound(editedRound));
        });
      }
    });

    return await modal.present();
  }

  private async showToastForEditedRound(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Your round was edited and saved!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private adjustViewableRound(round: any): void {
      const editedRound = this.round;
      editedRound.course = round.course;
      editedRound.score = round.score;
      editedRound.fairwaysInReg = round.fairwaysInReg;
      editedRound.greensInReg = round.greensInReg;
      editedRound.totalPutts = round.totalPutts;
      editedRound.totalBirdies = round.totalBirdies;
      editedRound.totalPars = round.totalPars;
      editedRound.date = new Date(round.date);
    }
}
