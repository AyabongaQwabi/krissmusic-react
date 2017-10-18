import { fromJS } from 'immutable';
import { INITIATE_TRACK_LIST } from '../actions/types';
import createActionHandler from './createActionHandler';

const initialState = fromJS({
  songs: [],
});

const actionHandlers = {};

const saveTracklist = (state, action) =>
  state.set('songs',fromJS(action.payload));

actionHandlers[INITIATE_TRACK_LIST] = saveTracklist;

const handle = createActionHandler(actionHandlers);

export default (state = initialState, action) => handle(state, action);
