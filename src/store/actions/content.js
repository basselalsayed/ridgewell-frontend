import { API_URL } from '../../constants';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { holidayInstance } from '../../services/axios';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await axios
    .get('users')
    .then(({ data: users }) => dispatch(setContent('SET_USERS', users)));

const getHolidays = () => async dispatch =>
  await holidayInstance
    .get()
    .then(({ data }) => {
      dispatch(setContent('SET_HOLIDAYS', data));
    })
    .catch(error => console.log(error, error.response));
const getRequests = () => async dispatch =>
  await axios
    .get(API_URL + 'requests', {
      headers: authHeader(),
    })
    .then(({ data }) => dispatch(setContent('SET_REQUESTS', data)))
    .catch(error => console.log(error, error.response));
const postHolidays = params => {};

const postRequests = params => {};

export { getUsers, getHolidays, getRequests, postHolidays, postRequests };
