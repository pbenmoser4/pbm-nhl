import _ from 'lodash';

import {
  GET_SCHEDULE
} from '../actions/types';

export default (state=[], action) => {
  switch(action.type) {
    case GET_SCHEDULE:
      return _.unionBy(state, action.payload, item => item.gamePk);
    default:
      return state;
  }
}
