// This reducer is required to make react-router-redux work with immutable.js
import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
  previousLocation: null,
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
      previousLocation: state.get('locationBeforeTransitions'),
    });
  }

  return state;
};