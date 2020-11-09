import { decryptorInstance, usersInstance } from '../../services/axios';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await usersInstance
    .get()
    .then(({ data }) => dispatch(setContent('SET_USERS', data)))
    .catch(error => console.log(error, error.response));

const getHolidays = userId => async dispatch =>
  await decryptorInstance
    .get(userId ? `holidays?userId=${userId}` : 'holidays')
    .then(({ data }) => dispatch(setContent('SET_HOLIDAYS', data)))
    .catch(error => console.log(error, error.response));

const getRequests = () => async dispatch =>
  await decryptorInstance
    .get('requests')
    .then(({ data }) => dispatch(setContent('SET_REQUESTS', data)))
    .catch(error => console.log(error, error.response));

const getAll = userId => async dispatch =>
  await Promise.all([
    dispatch(getRequests()),
    dispatch(getHolidays(userId)),
    !userId && dispatch(getUsers()),
  ]);

const postHolidays = params => {};

const postRequests = params => {};

export {
  getAll,
  getUsers,
  getHolidays,
  getRequests,
  postHolidays,
  postRequests,
};
