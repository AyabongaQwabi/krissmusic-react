import { STARTUP } from '../actions/types';

const initialState = null;

export default (state = initialState, action) => {
  if (action.type === STARTUP) {
    return action.payload;
  }
  return state;
};
