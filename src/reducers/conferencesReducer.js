import _ from 'lodash';

import {
  GET_CONFERENCES,
} from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case GET_CONFERENCES:
      return _.merge({...state}, action.payload);
    default:
      return state;
  }
}
