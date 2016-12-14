import { messageReducer } from './messages';
import { playerReducer } from './player';

export const reducers: Object = {
    messages: messageReducer,
    player: playerReducer
};
