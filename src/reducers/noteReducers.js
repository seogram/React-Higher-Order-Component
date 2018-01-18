import { GET_ALL_NOTES,GET_ALL_NOTES_REJECTED } from '../actions/types';

export function allNotesReducer(state = { allNotes: [] }, action) {
    switch (action.type) {
        case GET_ALL_NOTES:
            return { ...state, allNotes: [...action.payload] }
            break;

        case GET_ALL_NOTES_REJECTED:
            return { ...state, errMsg: { text: 'There is an error fetching old notes data . Try again !', date: Date.now() } }
            break;
    }
    return state
}


