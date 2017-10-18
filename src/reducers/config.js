import { fromJS } from 'immutable';
import { SETUP_CONFIGURATION } from '../actions/types';
import createActionHandler from './createActionHandler';

const initialState = fromJS({
  config: {},
});

const actionHandlers = {};

const saveConfig = (state, action) =>
  state.set('tracklist',fromJS(action.payload.config));

actionHandlers[SETUP_CONFIGURATION] = saveConfig;

const handle = createActionHandler(actionHandlers);

export default (state = initialState, action) => handle(state, action);
