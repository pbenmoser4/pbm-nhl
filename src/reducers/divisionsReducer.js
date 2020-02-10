import _ from 'lodash';

import {
  GET_DIVISION,
  GET_DIVISIONS,
} from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case GET_DIVISIONS:
      return _.merge({...state}, action.payload);
    default:
      return state;
  }
}
