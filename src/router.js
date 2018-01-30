import React from 'react';
import {Router, Route} from 'dva/router';
import AnalyserIndex from '../src/components/Analyser/AnalyserIndex';

function RouterConfig({history, app}) {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={AnalyserIndex} />
        <Route path="/analyser" component={AnalyserIndex} />
        <Route path="/analysers" component={AnalyserIndex} />
      </div>
    </Router>
  );
}

export default RouterConfig;
