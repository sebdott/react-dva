import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import PersonIndex from '../src/components/Person/PersonIndex'

function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage'),
  });

  const Users = dynamic({
    app,
    models: () => [
      import('./models/users'),
    ],
    component: () => import('./routes/Users'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/person" component={PersonIndex} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
