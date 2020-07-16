import { API_URL } from '../constants';
import axios from 'axios';
import authHeader from '../services/auth-header';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await axios
    .get(API_URL + 'users/', { headers: authHeader() })
    .then(({ data: users }) => dispatch(setContent('SET_USERS', users)));

const getHolidays = () => async dispatch =>
  await axios
    .get(API_URL + 'holiday/', {
      headers: authHeader(),
    })
    .then(({ data: { holidays } }) =>
      dispatch(setContent('SET_HOLIDAYS', holidays)),
    );

const getRequests = () => async dispatch =>
  await axios
    .get(API_URL + 'requests/', {
      headers: authHeader(),
    })
    .then(({ data: { requests } }) =>
      dispatch(setContent('SET_REQUESTS', requests)),
    );
const postHolidays = params => {};

const postRequests = params => {};

export { getUsers, getHolidays, getRequests, postHolidays, postRequests };
