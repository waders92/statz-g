import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { effects } from './effects';
import { NewCourseComponent } from './new-course/new-course.component';
import { NewRoundConverter } from './new-round/converters/new-round-converter';
import { reducers } from './reducers';
import { clearState } from './reducers/rounds.reducer';
import { RoundLineItemComponent } from './round-line-item/round-line-item.component';
import { StatDetailsComponent } from './stat-details/stat-details.component';

@NgModule({
  declarations: [AppComponent, RoundLineItemComponent, StatDetailsComponent, NewCourseComponent],
  entryComponents: [RoundLineItemComponent, StatDetailsComponent, NewCourseComponent],
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
