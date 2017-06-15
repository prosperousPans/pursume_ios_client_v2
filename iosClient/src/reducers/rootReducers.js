import { combineReducers } from 'redux';
import Matches from './Matches.js';
import Pursume from './Pursume.js';
import Dashboard from './Dashboard.js';

const appReducer = combineReducers({
  Matches,
  Pursume,
  Dashboard
});


const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;