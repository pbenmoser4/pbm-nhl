import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import AppHeader from './AppHeader';
import HomePage from './HomePage/HomePage';
import StandingsList from './StandingsList';

const App = props => {
  return (
    <Fragment>
      <Router history={history}>
        <AppHeader />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/standings" exact component={StandingsList} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App;
