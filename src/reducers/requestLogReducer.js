import {
  LOG_GET_STANDINGS,
  LOG_GET_TEAMS,
  LOG_GET_TEAMS_STATS,
  LOG_GET_DIVISIONS,
  LOG_GET_CONFERENCES,
  LOG_GET_SCHEDULE,
} from '../actions/types';

const updateRequestLogWithPayload = (state, payload) => {
  const {url, ...rest} = payload;
  let newState = {...state};
  const currentState = newState[url];
  const updatedState = currentState ? {...currentState, ...rest} : rest;
  newState[url] = updatedState;
  return newState
}

export default (state={}, action) => {
  switch (action.type) {
    case LOG_GET_STANDINGS:
      return updateRequestLogWithPayload(state, action.payload);
    case LOG_GET_TEAMS:
      return updateRequestLogWithPayload(state, action.payload);
    case LOG_GET_DIVISIONS:
      return updateRequestLogWithPayload(state, action.payload);
    case LOG_GET_CONFERENCES:
      return updateRequestLogWithPayload(state, action.payload);
    case LOG_GET_SCHEDULE:
      return updateRequestLogWithPayload(state, action.payload);
    case LOG_GET_TEAMS_STATS:
      return updateRequestLogWithPayload(state, action.payload);
    default:
      return state;
  }
}
