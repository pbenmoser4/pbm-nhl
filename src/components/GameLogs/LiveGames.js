import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Text } from 'grommet';

import GameDisplay from './GameDisplay';

import {
  getSchedule,
  getTeams,
} from '../../actions';

const LiveGames = props => {
  useEffect(() => {
    props.getSchedule();
    props.getTeams();
  }, [props]);

  return (
    <Box direction="column" gap="small">
      <Box background="dark-2" pad="xsmall">
        <Text weight="bold" size="large">Today's Games</Text>
      </Box>
      {props.schedule.map(game => {
        const homeTeam = props.teams[game.teams.home.team.id];
        const awayTeam = props.teams[game.teams.away.team.id];
        return (
          <GameDisplay game={game} homeTeam={homeTeam} awayTeam={awayTeam} key={game.gamePk}/>
        )
      })}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule,
    teams: state.teams,
  }
}

export default connect(
  mapStateToProps,
  { getSchedule, getTeams }
)(LiveGames);
