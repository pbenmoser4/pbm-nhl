import _ from 'lodash';

import {
  GET_STANDINGS,
  GET_TEAMS,
  GET_TEAMS_STATS,
} from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case GET_STANDINGS:
      return _.merge({...state}, action.payload);
    case GET_TEAMS:
      return _.merge({...state}, action.payload);
    case GET_TEAMS_STATS:
      return _.merge({...state}, action.payload);
    default:
      return state;
  }
}
