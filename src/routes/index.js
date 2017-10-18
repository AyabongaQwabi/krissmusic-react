import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { ROUTES } from '../config/constants';
import App from '../App';
import Home from '../views/Home';
import Upload from '../views/Upload';

export default function () {
  return (
    <Route path={ROUTES.HOME} component={App}>
      <IndexRoute component={Home} />
      <Route path={ROUTES.UPLOAD} component={Upload} />
      <Route path="*" component={Home} />
    </Route>
  );
}
