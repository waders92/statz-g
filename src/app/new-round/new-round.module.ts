import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewRoundComponent } from './new-round.component';
import { NewRoundConverter } from './converters/new-round-converter';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: NewRoundComponent }])
  ],
  declarations: [NewRoundComponent],
  providers: [NewRoundConverter]
})
export class NewRoundModule {}
