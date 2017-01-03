import { ActionReducer, Action } from '@ngrx/store';

export const ActionTypes = {
  CONNECTED: 'CONNECTED'
};

export interface State {
  connected: boolean;
};

const initialState: State = {
  connected: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.CONNECTED:
      return <State> {
        connected: true
      };

    default:
      return state;
  }
}
