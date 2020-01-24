import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { NewRoundConverter } from '../new-round/converters/new-round-converter';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }])
  ],
  declarations: [HistoryComponent],
  providers: [NewRoundConverter]
})
export class HistoryModule {}
