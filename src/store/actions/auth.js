import API_URL from '../../constants/api';
import axios from 'axios';

const ENDPOINT = API_URL + 'session/';

const setUser = payload => ({ type: 'SET_USER', payload });

export const logOut = () => ({ type: 'LOG_OUT' });

// Methods

export const signUp = userInfo => async dispatch => {
  await axios.post(ENDPOINT + 'signup', userInfo).then(({ data: { user } }) => {
    user.accessToken && localStorage.setItem('user', JSON.stringify(user));

    dispatch(setUser(user));
  });
};

export const login = userInfo => async dispatch => {
  const response = await axios.post(ENDPOINT + 'signin', userInfo);

  const {
    data: { user },
  } = response;

  user.accessToken && localStorage.setItem('user', JSON.stringify(user));

  console.log(user, 'data');

  dispatch(setUser(user));
};

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
