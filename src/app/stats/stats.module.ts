import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewRoundConverter } from '../new-round/converters/new-round-converter';
import { StatsComponent } from './stats.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StatsComponent }])
  ],
  declarations: [StatsComponent]
})
export class StatsModule {}