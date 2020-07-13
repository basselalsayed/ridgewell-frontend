import API_URL from '../../constants/api';
import axios from 'axios';
import authHeader from './auth-header';

const ENDPOINT = API_URL + 'users/';

const setContent = (type, payload) => ({ type, payload });

// Methods

export const getUsers = () => async dispatch => {
  await axios
    .get(ENDPOINT)
    .then(({ data: { users } }) => dispatch(setContent('SET_USER', users)));
};

export const getHolidyas = () => async dispatch =>
  await axios
    .get(API_URL + 'holiday/', {
      headers: authHeader(),
    })
    .then(({ data: { holidays } }) =>
      dispatch(setContent('SET_HOLIDAYS', holidays)),
    );

export const getRequests = () => async dispatch =>
  await axios
    .get(API_URL + 'holidays/', {
      headers: authHeader(),
    })
    .then(({ data: { requests } }) =>
      dispatch(setContent('SET_REQUESTS', requests)),
    );

// export const autoLogin = () => dispatch => {
//   fetch(`http://localhost:4000/auto_login`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => {
//       // data sent back will in the format of
//       // {
//       //     user: {},
//       //.    token: "aaaaa.bbbbb.bbbbb"
//       // }
//       localStorage.setItem('token', data.token);
//       dispatch(setUser(data.user));
//     });
// };
