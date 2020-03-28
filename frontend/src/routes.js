import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewInsicent';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/incidents/new" exact component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}
