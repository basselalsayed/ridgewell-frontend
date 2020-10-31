import { API_URL } from '../../constants';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await axios
    .get(API_URL + 'users', { headers: authHeader() })
    .then(({ data: users }) => dispatch(setContent('SET_USERS', users)));

const getHolidays = () => async dispatch =>
  await axios
    .get(API_URL + 'holidays', {
      headers: authHeader(),
    })
    .then(({ data }) => dispatch(setContent('SET_HOLIDAYS', data)))
    .catch(error => console.log(error, error.respon));

const getRequests = () => async dispatch =>
  await axios
    .get(API_URL + 'requests', {
      headers: authHeader(),
    })
    .then(({ data }) => dispatch(setContent('SET_REQUESTS', data)))
    .catch(error => console.log(error, error.respon));
const postHolidays = params => {};

const postRequests = params => {};

export { getUsers, getHolidays, getRequests, postHolidays, postRequests };
