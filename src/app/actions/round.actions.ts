import { Action } from '@ngrx/store';
import { IRound } from '../new-round/models/round';

export enum RoundActionTypes {
  LoadRoundsBegin = '[Round] Load Rounds Begin',
  LoadRoundsSuccess = '[Round] Load Rounds Success',
  LoadRoundsFailure = '[Round] Load Rounds Failure',
  AddRound = '[Round] Add Round',
  UpdateRound = '[Round] Update Round',
  GetRound = '[Round] Get Round'
}

export class LoadRoundsBegin implements Action {
  readonly type = RoundActionTypes.LoadRoundsBegin;
}

export class LoadRoundsSuccess implements Action {
  readonly type = RoundActionTypes.LoadRoundsSuccess;

  constructor(public payload: { data: IRound[] }) {

  }
}

export class LoadRoundsFailure implements Action {
  readonly type = RoundActionTypes.LoadRoundsFailure;

  constructor(public payload: { error: any }) {

  }
}

export class AddRound implements Action {
  readonly type = RoundActionTypes.AddRound;

  constructor(public round: IRound | any) {

  }
}

export class UpdateRound implements Action {
  readonly type = RoundActionTypes.UpdateRound;

  constructor(public round: IRound) {

  }
}

export class GetRound implements Action {
   readonly type = RoundActionTypes.GetRound;

  constructor(public round: IRound) {

  }
}

export type RoundActions = AddRound | UpdateRound | GetRound | LoadRoundsBegin | LoadRoundsSuccess | LoadRoundsFailure;
