import { isFSA } from 'flux-standard-action';

const middleware = store => next => action => { // eslint-disable-line
  if (!isFSA(action)) {
    console.error('Action Does Not Conform To FSA (https://github.com/acdlite/flux-standard-action)', action); // eslint-disable-line
  }

  return next(action);
};

export default function createFsaCheckMiddleware() {
  return middleware;
}