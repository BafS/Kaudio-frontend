import { ActionReducer, Action } from '@ngrx/store';
import { Playlist } from './../models/playlist';

export const ActionTypes = {
  // LOAD: 'LOAD',
  // LOAD_SUCCESS: 'LOAD_SUCCESS',
  INDEX_PLAYLISTS: 'INDEX_PLAYLISTS',
  ADD_PLAYLIST: 'ADD_PLAYLIST',
  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
  RESET_PLAYLISTS: 'RESET'
};

const initialState: Playlist[] = [];

export function reducer(state = initialState, action: Action): Playlist[] {
  switch (action.type) {
    case ActionTypes.INDEX_PLAYLISTS:
      return action.payload;

    case ActionTypes.UPDATE_PLAYLIST:
      return [
        ...state.slice(0, action.payload.index),
        action.payload.playlist,
        ...state.slice(action.payload.index + 1)
      ];

    case ActionTypes.ADD_PLAYLIST:
      return [...state, action.payload];

    case ActionTypes.REMOVE_PLAYLIST:
      return state;

    case ActionTypes.RESET_PLAYLISTS:
      return [];

    default:
      return state;
  }
}