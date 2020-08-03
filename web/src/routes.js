import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  );
}
