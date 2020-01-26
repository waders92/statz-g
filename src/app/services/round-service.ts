import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRound } from '../new-round/models/round';
import { AppState, getRoundState, getAllRounds } from '../reducers';
import { Store } from '@ngrx/store';
import { RoundActionTypes } from '../actions/round.actions';
import * as RoundActions from '../actions/round.actions';

@Injectable({
  providedIn: 'root'
})

export class RoundService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  getAllRounds() {
    return this.http.get<IRound[]>(this.baseUrl + 'rounds');
  }

  getRoundById(id: string) {
    return this.http.get<IRound>(this.baseUrl + 'rounds' + '/' + id);
  }

  addRound(round: IRound) {
    return this.http.post(this.baseUrl + 'rounds', round);
  }

  deleteRound(id: string) {
    return this.http.delete(this.baseUrl + 'rounds' + '/' + id);
  }

  updateRround(round: IRound) {
    return this.http.put(this.baseUrl + 'rounds' + '/' + round._id, round);
  }

  load() {
    this.store.dispatch(new RoundActions.LoadRoundsBegin());
  }

  getRoundState() {
    return this.store.select(getRoundState);
  }

  getRounds() {
    return this.store.select(getAllRounds);
  }
}
