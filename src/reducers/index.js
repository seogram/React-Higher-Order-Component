import { combineReducers } from 'redux'
import { allNotesReducer} from './noteReducers';

const appReducer = combineReducers({allNotes: allNotesReducer});

const rootReducer = (state, action) => {
  if (action.type == 'unauth_user') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
