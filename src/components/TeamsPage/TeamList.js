import React, { useEffect } from 'react';
import { Box, DataTable, Image, Text } from 'grommet';
import { connect } from 'react-redux';

import { getTeams, getTeamsStats } from '../../actions';
import { teamLogo } from '../../teamLogos';

const TeamList = props => {
  useEffect(() => {
    props.getTeams();
    props.getTeamsStats();
  }, [props]);
  console.log(props);

  const columns = [
    {
      property: "logo",
      render: datum => (
        <Box width="30px" height="30px" align="center" justify="center">
          <Image
            fit="contain"
            src={teamLogo(datum.abbreviation)}
            />
        </Box>
      )
    },{
      property: "name",
      header: "Team"
    },{
      property: "division",
      header: "Div",
    },{
      property: "gamesPlayed",
      header: "GP",
    },{
      property: "pts",
      header: "Pts",
    },{
      property: "ptPctg",
      header: "Pt%"
    },{
      property: "goalsPerGame",
      header: "GPG",
    },{
      property: "goalsAgainstPerGame",
      header: "GAPG",
    },{
      property: "powerPlayPercentage",
      header: "PP%",
    },{
      property: "penaltyKillPercentage",
      header: "PK%",
    },{
      property: "shotsPerGame",
      header: "S",
    },{
      property: "shotsAllowed",
      header: "SA",
    },{
      property: "faceOffWinPercentage",
      header: "FO%"
    },{
      property: "shootingPctg",
      header: "S%",
    },{
      property: "savePctg",
      header: "SV%"
    }
  ];

  const data = teams => {
    if (teams) {
      const example = teams[Object.keys(teams)[0]];
      if (example && example.teamStats) {
        return Object.keys(teams).map(teamKey => {
          let datum = {};
          const teamData = teams[teamKey];
          console.log(teamData);
          datum["name"] = teamData.name;
          datum["division"] = teamData.division.name;
          datum["abbreviation"] = teamData.abbreviation;
          const stats = teamData.teamStats
          datum = {...datum, ...stats};
          return datum;
        });
      }
    } else {
      return [];
    }
  }

  const renderTeamList = (teams) => {
    if (teams) {
      const example = teams[Object.keys(teams)[0]];
      if (example && example.teamStats) {
        return (
          <DataTable
            resizeable={true}
            sortable={true}
            columns={columns}
            data={data(teams)}
            background={{
              header: "dark-3",
              body: ["white", "light-1"]
            }}
            />
        )
      }
    }
  }

  return (
    <Box pad="medium">
      {renderTeamList(props.teams)}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
  }
}

export default connect(
  mapStateToProps,
  { getTeams, getTeamsStats }
)(TeamList);
