export default (actionHandlers) => (state, action) => {
  const handler = actionHandlers[action.type];
  if (typeof handler === 'function') {
    return handler(state, action);
  }
  return state;
};