import React from 'react';
import { Box } from 'grommet';

import StandingsList from '../StandingsList';
import LiveGames from '../GameLogs/LiveGames';

const HomePage = props => {

  return (
    <Box direction="row" pad="small" gap="medium">
      <Box width="medium">
        <StandingsList />
      </Box>
      <Box fill="horizontal">
        <LiveGames />
      </Box>
    </Box>
  )
}

export default HomePage;
