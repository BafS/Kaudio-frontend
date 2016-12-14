import { ActionReducer, Action } from '@ngrx/store';
import { AudioFile } from './../models';

export const LOAD_SONG = 'LOAD_SONG';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const STOP = 'STOP';

export function playerReducer(state: AudioFile = null, action: Action): AudioFile {
    switch (action.type) {
        case LOAD_SONG:
            return <AudioFile> {
                filepath: action.payload
            }

        default:
            return state;
    }
}
