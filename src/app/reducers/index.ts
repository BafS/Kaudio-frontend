import { messageReducer } from './messages';
import { playerReducer } from './player';
import { playlistReducer } from './playlists';
import { appReducer } from './app';

export const reducers: Object = {
    messages: messageReducer,
    player: playerReducer,
    playlists: playlistReducer,
    app: appReducer
};
