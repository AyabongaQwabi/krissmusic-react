import { fromJS } from 'immutable';

import createActionHandler from './createActionHandler';

const initialState = fromJS({});

const actionHandlers = {};

const handle = createActionHandler(actionHandlers);

export default (state = initialState, action) => handle(state, action);
