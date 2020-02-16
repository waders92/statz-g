import {
  ActionReducerMap,
  MetaReducer,
  createSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { roundReducer } from './rounds.reducer';

import * as fromData from './rounds.reducer';
import { RoundActionTypes } from '../actions/round.actions';

export interface AppState {
  rounds: fromData.RoundState;
}

export const reducers: ActionReducerMap<AppState> = {
  rounds: roundReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
export const getRoundState = (state: AppState) => state.rounds;
export const getAllRounds = createSelector(
  getRoundState,
  fromData.getRounds
);

export const getRoundById = (id: string) => createSelector(
  getRoundState,
  (rounds) => rounds.rounds.filter(x => x._id === id)
);
