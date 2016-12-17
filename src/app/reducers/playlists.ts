import { ActionReducer, Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import { Playlist } from './../models/playlist';

export const ActionTypes = {
  LOAD_PLAYLIST: 'LOAD_PLAYLIST',
  // LOAD_SUCCESS: 'LOAD_SUCCESS',

  SELECT_PLAYLIST: 'SELECT_PLAYLIST',

  INDEX_PLAYLISTS: 'INDEX_PLAYLISTS',
  INDEX_PLAYLISTS_SUCCESS: 'INDEX_PLAYLISTS_SUCCESS',
  INDEX_PLAYLISTS_FAIL: 'INDEX_PLAYLISTS_FAIL',

  ADD_PLAYLIST: 'ADD_PLAYLIST',
  ADD_PLAYLIST_SUCCESS: 'ADD_PLAYLIST_SUCCESS',
  ADD_PLAYLIST_FAIL: 'ADD_PLAYLIST_FAIL',

  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
  RESET_PLAYLISTS: 'RESET'
};

export interface State {
  entities: { [id: string]: Playlist };
  selectedPlaylistId: string | null;
};

const initialState: State = {
  entities: {},
  selectedPlaylistId: null,
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.INDEX_PLAYLISTS:
      const playlists: any[] = action.payload;
      // console.log(playlists.reduce((prev, curr) => [...prev, ...curr._id]));
    
      return {
        entities: playlists.reduce((map, obj) => {
          map[obj._id] = obj;
          return map;
        }, {}),
        selectedPlaylistId: state.selectedPlaylistId
      };

    case ActionTypes.LOAD_PLAYLIST:
      const playlist: Playlist = action.payload;


      // Do not load 2 times the same playlist
      const key = Object.keys(state.entities).indexOf(playlist._id);
      if (key > -1 && state.entities[playlist._id].tracks) {
        console.log('NO NEED AN UPDATE');
        
        return state;
      }

      return {
        entities: Object.assign({}, state.entities, {
          [playlist._id]: playlist
        }),
        selectedPlaylistId: state.selectedPlaylistId,
      };
    
    case ActionTypes.SELECT_PLAYLIST: {
      return {
        entities: state.entities,
        selectedPlaylistId: action.payload
      };
    }

    case ActionTypes.REMOVE_PLAYLIST:
      // TODO
      return state;

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedPlaylistId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});