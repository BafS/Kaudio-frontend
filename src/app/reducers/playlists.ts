import { ActionReducer, Action } from '@ngrx/store';
import { Playlist } from './../models/playlist';

export const INDEX_PLAYLISTS = 'INDEX_PLAYLISTS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const RESET_PLAYLISTS = 'RESET';

const initialState: Playlist[] = [
    <Playlist> {
        name: '',
        description: '',
        public: true,
    }
];

export function reducer(state = initialState, action: Action): Playlist[] {
    switch (action.type) {
        case INDEX_PLAYLISTS:
            return action.payload;

        case UPDATE_PLAYLIST:
            return [
                    ...state.slice(0, action.payload.index),
                    action.payload.playlist,
                    ...state.slice(action.payload.index + 1)
                ];

        case ADD_PLAYLIST:
            return [...state, action.payload];

        case REMOVE_PLAYLIST:
            return state;

        case RESET_PLAYLISTS:
            return [];

        default:
            return state;
    }
}