import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoundLineItemComponent } from './round-line-item/round-line-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects';
import { NewRoundConverter } from './new-round/converters/new-round-converter';
import { clearState } from './reducers/rounds.reducer';
import { StatDetailsComponent } from './stat-details/stat-details.component';

@NgModule({
  declarations: [AppComponent, RoundLineItemComponent, StatDetailsComponent],
  entryComponents: [RoundLineItemComponent, StatDetailsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    EffectsModule.forRoot(effects),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [clearState],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }), !environment.production ? StoreDevtoolsModule.instrument() : []],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NewRoundConverter
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
