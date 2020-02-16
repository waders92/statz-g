import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRound } from '../new-round/models/round';
import { AppState, getRoundState, getAllRounds, getRoundById } from '../reducers';
import { Store } from '@ngrx/store';
import * as RoundActions from '../actions/round.actions';

@Injectable({
  providedIn: 'root'
})

export class RoundDataService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  getAllRounds(action: RoundActions.LoadRoundsBegin) {
    return this.http.get<IRound[]>(this.baseUrl + 'rounds' + '/' + action.id);
  }

  addRound(round: IRound) {
    return this.http.post(this.baseUrl + 'rounds', round);
  }

  updateRound(round: IRound) {
    return this.http.put(this.baseUrl + 'rounds' + '/' + round._id, round);
  }

  load(id: string) {
    this.store.dispatch(new RoundActions.LoadRoundsBegin(id));
  }

  getRoundState() {
    return this.store.select(getRoundState);
  }

  getRounds() {
    return this.store.select(getAllRounds);
  }

  getRound(id: string) {
    return this.store.select(getRoundById(id));
  }
}
