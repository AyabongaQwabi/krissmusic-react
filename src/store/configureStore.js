import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import promiseMiddleware from '../middleware/promiseMiddleware';
import createLogger from '../middleware/createLoggerMiddleware';
import createFsaCheck from '../middleware/createFsaCheckMiddleware';
import { catchErrorMiddleware } from '../config/configureErrorHandling';
import createScrollToTopMiddleware from '../middleware/createScrollToTopMiddleware';
import fsaThunkMiddleware from 'redux-fsa-thunk';

/*
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux
  // store in sync
  const middleware = [
    catchErrorMiddleware,
    promiseMiddleware,
    routerMiddleware(history),
    fsaThunkMiddleware,
    createScrollToTopMiddleware(),
  ];

    middleware.push(createLogger());
    middleware.push(createFsaCheck());


  const store = createStore(rootReducer,
    fromJS(initialState),
    compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
