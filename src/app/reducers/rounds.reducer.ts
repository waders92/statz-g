import { IRound } from '../new-round/models/round';
import { RoundActions, RoundActionTypes } from '../actions/round.actions';


export const roundsFeatureKey = 'rounds';

export interface RoundState {
  rounds: Array<IRound>;
  loading: boolean;
  error: any;
}

export const initialState: RoundState = {
  rounds: [],
  loading: false,
  error: null
};

export function roundReducer(state = initialState, action: RoundActions ): RoundState {
  switch (action.type) {
    case RoundActionTypes.LoadRoundsBegin: {
      return { ...state, loading: true, error: null };
    }
    case RoundActionTypes.LoadRoundsSuccess: {
      return { ...state, loading: false, rounds: action.payload.data };
    }

    case RoundActionTypes.LoadRoundsFailure: {
      return { ...state, loading: false, error: action.payload.error };
    }
    case RoundActionTypes.AddRound: {
      return { ...state, rounds: [...state.rounds, action.round] };
    }
    case RoundActionTypes.UpdateRound: {
      const updatedState = [...state.rounds];
      updatedState[updatedState.findIndex(el => el._id === action.round._id)] = action.round;
      return { ...state, rounds: [...updatedState ] };
   }
   case RoundActionTypes.GetRound: {
     return { ...state, rounds: { ...state.rounds.filter(x => x._id === action.round._id) } };
   }

    default:
      return state;
  }
}

export const getRounds = (state: RoundState) => state.rounds;
