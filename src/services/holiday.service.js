import axios from 'axios';
import API_URL from '../constants/api';
import authHeader from './auth-header';

const ENDPOINT = API_URL + 'holiday/';
// const ENDPOINT = 'https://ridgewell-backend.herokuapp.com/session/';

const allHolidays = async () =>
  await axios.get(ENDPOINT, {
    headers: authHeader(),
  });
export default {
  allHolidays,
};
