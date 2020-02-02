import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HistoryDetailsComponent } from './history-details.component';
import { NewRoundConverter } from 'src/app/new-round/converters/new-round-converter';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HistoryDetailsComponent }])
  ],
  declarations: [HistoryDetailsComponent],
  providers: [NewRoundConverter]
})
export class HistoryDetailsModule {}
