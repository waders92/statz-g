import { Injectable } from '@angular/core';
import { RoundDataService } from '../services/round-data-service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as RoundActions from '../actions/round.actions';
import { of } from 'rxjs';

@Injectable()
export class RoundEffects {
  constructor(private actions: Actions, private roundService: RoundDataService) {}

  @Effect()
  loadRounds = this.actions.pipe(
    ofType(RoundActions.RoundActionTypes.LoadRoundsBegin),
    switchMap((userId) => {
      return this.roundService.getAllRounds(userId).pipe(
        map(rounds => new RoundActions.LoadRoundsSuccess({ data: rounds })),
        catchError(error =>
          of(new RoundActions.LoadRoundsFailure({ error }))
          )
      );
    })
  );
}
