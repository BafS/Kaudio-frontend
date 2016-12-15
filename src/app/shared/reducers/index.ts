import { messageReducer } from './messages';
import { playerReducer } from './player';
import { appReducer } from './app';

export const reducers: Object = {
    messages: messageReducer,
    player: playerReducer,
    app: appReducer
};
