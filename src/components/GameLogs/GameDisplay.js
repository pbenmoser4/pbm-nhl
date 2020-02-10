import React, { Fragment } from 'react';
import { Box, Image, Text } from 'grommet';

import { teamLogo } from '../../teamLogos';
import TeamDisplay from './TeamDisplay';

const GameDisplay = props => {
  const {game, homeTeam, awayTeam} = props;
  const scoreSize = "50px";

  const renderDisplay = () => {
    if (homeTeam && awayTeam && game) {
      return (
        <Box direction="column" round="xsmall" border={{"color": "dark-4"}} pad="small">
          <Text>{game.status.abstractGameState}</Text>
          <Box direction="row" gap="medium" justify="center" align="center">
            <TeamDisplay team={awayTeam} />
            <Box direction="row" gap="small">
              <Text weight="bold" size={scoreSize}>{game.teams.away.score}</Text>
            </Box>
            <Text>{` @ `}</Text>
            <Box direction="row" gap="small">
              <Text weight="bold" size={scoreSize}>{game.teams.home.score}</Text>
            </Box>
            <TeamDisplay team={homeTeam} />
          </Box>
        </Box>
      )
    }
  }

  return (
    <Fragment>
      {renderDisplay()}
    </Fragment>
  );
}

export default GameDisplay;
