export default (initialState) => {};

export const catchErrorMiddleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    return error;
  }
};
