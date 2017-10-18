import { LOCATION_CHANGE } from 'react-router-redux';

const scrollToTop = store => next => action => { // eslint-disable-line
  if (action.type === LOCATION_CHANGE && window) {
    if (window.scroll) {
      window.scroll(0, 0);
    } else if (window.scrollTo) {
      window.scrollTo(0, 0);
    } else if (window.scrollY) {
      window.scrollY(0, 0);
    }
  }

  return next(action);
};

export default function createScrollToTopMiddleware() {
  return scrollToTop;
}