import { ActionReducer, Action } from '@ngrx/store';
import { Message } from './../models/message';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const RESET = 'RESET';

export function reducer(state: Message[] = [], action: Action): Message[] {
    switch (action.type) {
        case ADD_MESSAGE:
            return state.concat(action.payload);

        case REMOVE_MESSAGE:
            return state;

        case RESET:
            return [];

        default:
            return state;
    }
}