import React, { Fragment } from 'react';
import { Box, Image, Text } from 'grommet';

import { teamLogo } from '../../teamLogos';

const TeamDisplay = props => {
  const {team} = props;
  const logoSize = "75px";

  const renderDisplay = () => {
    if (team && team.leagueRecord) {
      const {wins, losses, ot} = team.leagueRecord;
      return (
        <Box direction="column" gap="xsmall" align="center" justify="center">
          <Text size="small" weight="bold">{team.name}</Text>
          <Box width={logoSize} height={logoSize} align="center" justify="center">
            <Image
              fit="contain"
              src={teamLogo(team.abbreviation)}
              />
          </Box>
          <Box direction="column" justify="center" align="center">
            <Text size="xsmall">{`${team.division.name} Division`}</Text>
            <Text size="xsmall">{`(${wins}-${losses}-${ot}) | ${team.points} pts`}</Text>
            <Text size="xsmall">{`Streak: ${team.streak.streakCode}`}</Text>
          </Box>
        </Box>
      )
    }
  }

  return (
    <Fragment>
      {renderDisplay()}
    </Fragment>
  )
}

export default TeamDisplay;
