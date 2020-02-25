import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './stats.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      radius: 70,
      toFixed: 2,
      titleFontSize: '25',
      subtitleFontSize: '15',
      animation: true,
      animationDuration: 300,
      outerStrokeColor: '#808080',
      innerStrokeColor: '#e7e8ea',
    }),
    RouterModule.forChild([{ path: '', component: StatsComponent }])
  ],
  declarations: [StatsComponent]
})
export class StatsModule {}
