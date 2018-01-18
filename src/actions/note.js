import {GET_ALL_NOTES} from './types';
import axios from 'axios';

export function getAllNote() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/allNotes/')
      dispatch({ type: GET_ALL_NOTES, payload: response.data });
    } catch (e) {
      dispatch({ type: GET_ALL_NOTES_REJECTED, payload: 'There is an error fetching results' })
    }
  }
}



