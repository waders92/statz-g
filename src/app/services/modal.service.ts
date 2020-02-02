import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RoundLineItemComponent } from '../round-line-item/round-line-item.component';
import { IRound } from '../new-round/models/round';
import { roundPropertiesAndInputValues } from '../new-round/models/round-type-values';
import { RoundLogicService } from './round-logic.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalController: ModalController,
    private logicService: RoundLogicService,
    private toastCtrl: ToastController
    ) { }

  public async presentNewRoundForm(roundItemInputs: any) {
    const modal = await this.modalController.create({
      component: RoundLineItemComponent,
      componentProps: {
        roundItems: roundItemInputs
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      if (data && data.data !== undefined) {
        const newRound = this.logicService.convertRoundFromJson(data);
        this.logicService.addRound(newRound).subscribe((round) => {
          this.logicService.updateStoreForAdd(round);
          this.showToastForRound();
        });
      }
    });

    return await modal.present();
  }

  public async presentEditRoundForm(editedRound: any, round: IRound) {
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
        editedRound = this.logicService.convertRoundFromJson(data);
        this.logicService.updateRound(editedRound).subscribe((rnd) => {
          this.logicService.adjustViewableRound(editedRound, rnd);
          this.logicService.updateStoreForEdit(editedRound);
          this.showToastForRound(true);
        });
      }
    });

    return await modal.present();
  }

  private async showToastForRound(isEdit = false): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: isEdit ? 'Your round was edited and saved!' : 'Your round was added and saved!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
