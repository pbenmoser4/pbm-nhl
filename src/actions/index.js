import _ from 'lodash';

import {
  GET_STANDINGS,
  GET_TEAMS,
  GET_TEAMS_STATS,
  GET_CONFERENCES,
  GET_DIVISIONS,
  GET_SCHEDULE,
} from './types';

import {
  LOG_GET_STANDINGS,
  LOG_GET_TEAMS,
  LOG_GET_TEAMS_STATS,
  LOG_GET_CONFERENCES,
  LOG_GET_DIVISIONS,
  LOG_GET_SCHEDULE,
} from './types';

import nhl from '../api/nhl';

const refreshRateForUrl = urlKey => {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  return oneDay;
}

const dispatchRequestLogStart = (type, urlKey, dispatch) => {
  dispatch({
    type: type,
    payload: {
      "url": urlKey,
      "lastFetch": Date.now(),
      "fetching": true,
      "refreshRate": refreshRateForUrl(urlKey),
    }
  });
}

const dispatchRequestLogEnd = (type, urlKey, dispatch) => {
  dispatch({
    type: type,
    payload: {
      "url": urlKey,
      "fetching": false,
    }
  });
}

const shouldFetch = (urlKey, state) => {
  const {requestLog} = state;
  if (requestLog[urlKey]) {
    const {lastFetch, fetching, refreshRate} = requestLog[urlKey];
    if (fetching) {
      console.log('already fetching');
      return false;
    }
    if (Date.now() - lastFetch < refreshRate) {
      console.log('too soon!');
      return false;
    } else {
      console.log('the time has come');
      return true;
    }
  } else {
    console.log('no record');
    return true;
  }
}

const urlKeyWithParams = (urlBase, params) => {
  let urlKey = String(urlBase);
  if (Object.keys(params).length > 0) {
    urlKey += "?";
    const paramsKeys = _.sortedUniq(Object.keys(params));
    let paramsArray = [];
    paramsKeys.forEach((key) => {
      paramsArray.push(`${key}=${params[key]}`);
    });
    urlKey += paramsArray.join("&");
  }
  return urlKey;
}

export const getStandings = (props={}) => async (dispatch, getState) => {
  // GET https://statsapi.web.nhl.com/api/v1/standings
  const url = "/standings";
  if (!shouldFetch(url, getState())) {
    return false;
  }
  dispatchRequestLogStart(LOG_GET_STANDINGS, url, dispatch);

  const response = await nhl.get(url);
  const {records} = response.data;
  let dispatchData = {};
  records.forEach((div, index) => {
    const division = div.division;
    const conference = div.conference;
    const teams = div.teamRecords;
    teams.forEach((teamData, i) => {
      const {team, ...rest} = teamData;
      const teamId = team.id;
      dispatchData[teamId] = {
        "division": division,
        "conference": conference,
        ...rest
      }
    });
  });

  dispatch({
    type: GET_STANDINGS,
    payload: dispatchData
  })

  dispatchRequestLogEnd(LOG_GET_STANDINGS, url, dispatch);
}

export const getTeams = (props={}) => async (dispatch, getState) => {
  // GET https://statsapi.web.nhl.com/api/v1/teams
  const url = "/teams";
  if (!shouldFetch(url, getState())) {
    return false;
  }
  dispatchRequestLogStart(LOG_GET_TEAMS, url, dispatch);

  const response = await nhl.get(url);
  const {teams} = response.data;
  let dispatchData = {};
  teams.forEach((team, i) => {
    const {id, ...rest} = team;
    dispatchData[id] = rest;
  });

  dispatch({
    type:GET_TEAMS,
    payload: dispatchData,
  });

  dispatchRequestLogEnd(LOG_GET_TEAMS, url, dispatch);
}

export const getTeamsStats = (props={}) => async (dispatch, getState) => {
  const url = "/teams"
  const params = {"expand": "team.stats"};
  const urlFinal = urlKeyWithParams(url, params);
  // console.log(urlFinal);
  if (!shouldFetch(urlFinal, getState())) {
    return false;
  }
  dispatchRequestLogStart(LOG_GET_TEAMS_STATS, urlFinal, dispatch);

  const response = await nhl.get(urlFinal);
  const {teams} = response.data;
  let dispatchData = {};
  teams.forEach((team, i) => {
    const {id, teamStats, ...rest} = team;
    const splits = teamStats[0].splits;
    const stats = splits[0].stat;
    const standings = splits[1].stat;
    const dispatchDataDict = {"teamStats": stats, "teamStandings": standings};
    dispatchData[id] = dispatchDataDict;
  });

  dispatch({
    type: GET_TEAMS_STATS,
    payload: dispatchData,
  })


  dispatchRequestLogEnd(LOG_GET_TEAMS_STATS, urlFinal, dispatch);
}

export const getConferences = (props={}) => async (dispatch, getState) => {
  // GET https://statsapi.web.nhl.com/api/v1/conferences
  const url = "/conferences";
  if (!shouldFetch(url, getState())) {
    return false;
  }
  dispatchRequestLogStart(LOG_GET_CONFERENCES, url, dispatch);

  const response = await nhl.get(url);
  const {conferences} = response.data;
  let dispatchData = {};
  conferences.forEach((conf, i) => {
    const {id, ...rest} = conf;
    dispatchData[id] = rest;
  });

  dispatch({
    type: GET_CONFERENCES,
    payload: dispatchData,
  });

  dispatchRequestLogEnd(LOG_GET_CONFERENCES, url, dispatch);
}

export const getDivisions = (props={}) => async (dispatch, getState) => {
  // GET https://statsapi.web.nhl.com/api/v1/divisions
  const url = "/divisions";
  if (!shouldFetch(url, getState())) {
    return false;
  }
  dispatchRequestLogStart(LOG_GET_DIVISIONS, url, dispatch);

  const response = await nhl.get(url);
  const {divisions} = response.data;
  let dispatchData = {};
  divisions.forEach((div, i) => {
    const {id, ...rest} = div;
    dispatchData[id] = rest;
  });

  dispatch({
    type: GET_DIVISIONS,
    payload: dispatchData,
  });

  dispatchRequestLogEnd(LOG_GET_DIVISIONS, url, dispatch);
}

export const getSchedule = (params={}) => async (dispatch, getState) => {
  const urlBase = "/schedule";
  const url = urlKeyWithParams(urlBase, params);
  if (!shouldFetch(url, getState())) {
    return false;
  }

  dispatchRequestLogStart(LOG_GET_SCHEDULE, url, dispatch);

  const response = await nhl.get(url);
  console.log(response);
  const {dates} = response.data;
  let dispatchData = [];
  dates.forEach((date, i) => {
    const {games} = date;
    dispatchData = [...dispatchData, ...games];
  });

  dispatch({
    type: GET_SCHEDULE,
    payload: dispatchData,
  })

  dispatchRequestLogEnd(LOG_GET_SCHEDULE, url, dispatch);
}
