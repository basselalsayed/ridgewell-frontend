import { decryptorInstance, usersInstance } from '../../services/axios';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await usersInstance
    .get()
    .then(({ data }) => dispatch(setContent('SET_USERS', data)))
    .catch(error => console.log(error, error.response));

const getHolidays = () => async dispatch =>
  await decryptorInstance
    .get('holidays')
    .then(({ data }) => dispatch(setContent('SET_HOLIDAYS', data)))
    .catch(error => console.log(error, error.response));

const getRequests = () => async dispatch =>
  await decryptorInstance
    .get('requests')
    .then(({ data }) => dispatch(setContent('SET_REQUESTS', data)))
    .catch(error => console.log(error, error.response));

const postHolidays = params => {};

const postRequests = params => {};

export { getUsers, getHolidays, getRequests, postHolidays, postRequests };
