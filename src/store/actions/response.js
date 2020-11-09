const setContent = (type, payload) => ({ type, payload });

const setError = error => setContent('SET_ERROR', error);

const setMessage = message => setContent('SET_MESSAGE', message);

export { setError, setMessage };
