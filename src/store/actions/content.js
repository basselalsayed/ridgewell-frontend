import API_URL from '../../constants/api';
import axios from 'axios';
import authHeader from './auth-header';

const setContent = (type, payload) => ({ type, payload });

// Methods

export const getUsers = () => async dispatch => {
  await axios
    .get(API_URL + 'users/', { headers: authHeader() })
    .then(({ data }) => dispatch(setContent('SET_USERS', data.users)));
};

export const getHolidays = () => async dispatch =>
  await axios
    .get(API_URL + 'holiday/', {
      headers: authHeader(),
    })
    .then(({ data: { holidays } }) =>
      dispatch(setContent('SET_HOLIDAYS', holidays)),
    );

export const getRequests = () => async dispatch =>
  await axios
    .get(API_URL + 'requests/', {
      headers: authHeader(),
    })
    .then(({ data: { requests } }) =>
      dispatch(setContent('SET_REQUESTS', requests)),
    );
