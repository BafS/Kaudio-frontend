import * as fromMessages from './messages';
import * as fromPlayer from './player';
import * as fromPlaylists from './playlists';

export interface State {
  messages: any,
  player: any,
  playlists: fromPlaylists.State
}

export const reducers: Object = {
  messages: fromMessages.reducer,
  player: fromPlayer.reducer,
  playlists: fromPlaylists.reducer,
};
