import { ActionReducer, Action } from '@ngrx/store';
import { App } from './../models';

export const SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST';

const defaultState = <App> {
    currentPlaylist: 0
};

export function appReducer(state: App = defaultState, action: Action): App {
    switch (action.type) {
        case SET_CURRENT_PLAYLIST:
            return Object.assign({}, state, {
                currentPlaylist: action.payload
            });

        default:    
            return state;
    }
}
