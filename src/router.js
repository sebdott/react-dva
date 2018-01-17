import React from 'react';
import {Router, Switch, Route} from 'dva/router';
import PersonIndex from '../src/components/Person/PersonIndex';
import Users from '../src/components/Users/Users';

function RouterConfig({history, app}) {
  return (
    <Router history={history}>
      <Route path="/" component={PersonIndex} />
      <Route path="/Users" component={Users} />
      <Route path="/person" component={PersonIndex} />
    </Router>
  );
}

export default RouterConfig;
