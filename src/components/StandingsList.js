import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Text } from 'grommet';

import {
  getStandings,
  getTeams,
  getConferences,
  getDivisions,
} from '../actions';

const ORDER_BY_LEAGUE = 'League';
const ORDER_BY_CONFERENCE = 'Conference';
const ORDER_BY_DIVISION = 'Division';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate() - 1).padStart(2, '0')}`
}

const StandingsList = props => {
  const [standingsGroup, setStandingsGroup] = useState(ORDER_BY_LEAGUE);
  useEffect(() => {
    props.getStandings();
    props.getTeams();
    props.getConferences();
    props.getDivisions();
  }, [props]);

  const renderGroupPicker = () => {
    const groups = [
      ORDER_BY_LEAGUE,
      ORDER_BY_CONFERENCE,
      ORDER_BY_DIVISION,
    ];

    return (
      <Box direction="row">
        {groups.map((group, id) => {
          return (
            <Box
              fill={true}
              hoverIndicator={{color:'dark-2'}}
              focusIndicator={false}
              pad="xsmall"
              align="center"
              justify="center"
              background={standingsGroup === group ? 'dark-3': 'light-1'}
              onClick={() => setStandingsGroup(group)}
              key={id}
              >
              <Text size="small">{group}</Text>
            </Box>
          )
        })}
      </Box>
    )
  }

  const renderStandingsBy = (orderBy, teams) => {
    if (teams[1]){
      let groups = null;
      if (orderBy === ORDER_BY_LEAGUE) {
        groups = _.groupBy(teams, (team) => ORDER_BY_LEAGUE);
      } else if (orderBy === ORDER_BY_CONFERENCE) {
        groups = _.groupBy(teams, (team) => team.conference.name);
      } else if (orderBy === ORDER_BY_DIVISION) {
        groups = _.groupBy(teams, (team) => team.division.name);
      }

      const groupTitles = Object.keys(groups);

      return groupTitles.map((title, idx) => {
        const teams = groups[title];
        const sortedTeams = _.sortBy(teams, team => parseInt(team.leagueRank));
        return (
          <Box direction="column" gap="xsmall" pad={{bottom:"small"}} key={idx}>
            <Box pad="small" background="light-3">
              <Text weight="bold">{title}</Text>
            </Box>
            {sortedTeams.map((team, id) => {
              const {leagueRecord} = team;
              const wins = leagueRecord ? leagueRecord.wins : "";
              const losses = leagueRecord ? leagueRecord.losses : "";
              const ot = leagueRecord ? leagueRecord.ot : "";
              return (
                <Box direction="row" justify="between" key={id} align="center" pad={{left:"xsmall", right:"xsmall"}}>
                  <Box direction="row" gap="xsmall">
                    <Text size="small">{`${id + 1}.`}</Text>
                    <Text weight="bold" size="small">{team.teamName}</Text>
                    <Text size="small">{`(${wins}-${losses}-${ot})`}</Text>
                  </Box>
                  <Box direction="row" gap="xsmall">
                    <Text size="small">{`${team.points} (${team.gamesPlayed})`}</Text>
                  </Box>
                </Box>
              )
            })}
          </Box>
        )
      })
    }
  }

  return (
    <Box background="light-1" direction="column">
      <Box pad={{left:"small", top:"xsmall", bottom:"xsmall"}} background="dark-2">
        <Text weight="bold" size="large">Standings</Text>
      </Box>
      {renderGroupPicker()}
      {renderStandingsBy(standingsGroup, props.teams)}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    conferences: state.conferences,
    divisions: state.divisions,
  }
}

export default connect(
  mapStateToProps,
  { getStandings, getTeams, getConferences, getDivisions }
)(StandingsList);
