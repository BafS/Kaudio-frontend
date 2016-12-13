import { ActionReducer, Action } from '@ngrx/store';
import { Playlist } from './../models/playlist';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const RESET = 'RESET';

const defaultState = [
    <Playlist> {
        name: '',
        description: '',
        public: true,
    }
];

export function playlistReducer(state: Playlist[] = defaultState, action: Action): Playlist[] {
    switch (action.type) {
        case ADD_PLAYLISTS:
            return action.payload;

        case ADD_PLAYLIST:
            return state.concat(action.payload);

        case REMOVE_PLAYLIST:
            return state;

        case RESET:
            return [];

        default:
            return state;
    }
}