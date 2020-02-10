import { combineReducers } from 'redux';

import conferencesReducer from './conferencesReducer';
import divisionsReducer from './divisionsReducer';
import teamsReducer from './teamsReducer';
import requestLogReducer from './requestLogReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
  teams: teamsReducer,
  requestLog: requestLogReducer,
  conferences: conferencesReducer,
  divisions: divisionsReducer,
  schedule: scheduleReducer,
});
