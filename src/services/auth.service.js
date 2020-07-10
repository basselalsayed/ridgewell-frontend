import axios from 'axios';
import API_URL from '../constants/api';

const ENDPOINT = API_URL + 'session/';
// const ENDPOINT = 'https://ridgewell-backend.herokuapp.com/session/';

const register = (username, email, password) => {
  return axios.post(ENDPOINT + 'signup', {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post(ENDPOINT + 'signin', {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};