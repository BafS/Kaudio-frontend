import * as fromMessages from './messages';
import * as fromPlayer from './player';
import * as fromPlaylists from './playlists';

export const reducers: Object = {
  messages: fromMessages.reducer,
  player: fromPlayer.reducer,
  playlists: fromPlaylists.reducer,
};
