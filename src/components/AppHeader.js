import React from 'react';
import { Box } from 'grommet';
import { Link } from 'react-router-dom';

const AppHeader = props => {
  return (
    <Box direction="column">
      <Box background="neutral-2" pad="medium" justify="center" align="center">
        Ben Moser's NHL Page
      </Box>
      <Box direction="row" gap="small" pad="xsmall" background="light-1">
        <Link to="/">Home</Link>
        <Link to="/standings">Teams</Link>
        <Link to="/">Leaders</Link>
        <Link to="/">Gamelog</Link>
      </Box>
    </Box>
  )
}

export default AppHeader;
