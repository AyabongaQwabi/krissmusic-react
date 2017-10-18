
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import preRenderMiddleware from './middleware/preRenderMiddleware';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import { Provider } from 'react-redux';
import { startup } from './actions/startup.js';

require('./polyfills');

let previousPath = '';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);

// option selectLocationState To Use immutable.js
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});
const routes = createRoutes(store);


// logs route to google analytics
export default function logRoute() {
  const currentPath = window.location.pathname;
  if (currentPath !== previousPath) {
    previousPath = currentPath;
  }
}

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;

  preRenderMiddleware(store.dispatch, components, params);
  logRoute();
}
//const store = createStore(RootReducer);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
     {routes}
    </Router>
  </Provider>,
 document.getElementById('root'));

store.dispatch(startup());
