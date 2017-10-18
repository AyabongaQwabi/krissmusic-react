import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

// Transform state before print. Eg. convert Immutable object to plain JSON.
function fromImmutable(state) {
  if (Immutable.Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
}

export default function createLoggerMiddleware() {
  return createLogger({
    stateTransformer: fromImmutable,
    actionTransformer: fromImmutable,
    collapsed: true,
  });
}
