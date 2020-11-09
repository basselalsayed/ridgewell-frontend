const setContent = (type, payload) => ({ type, payload });

const setError = error => dispatch => dispatch(setContent('SET_ERROR', error));

const setMessage = message => dispatch =>
  dispatch(setContent('SET_MESSAGE', message));

const hideAlert = message => dispatch =>
  dispatch(setContent('HIDE_ALERT', message));

export { hideAlert, setError, setMessage };
