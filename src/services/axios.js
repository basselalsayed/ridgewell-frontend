import axios from 'axios';
import { API_URL } from '../constants';
import { decryptUser } from '../helpers';
import authHeader from './auth-header';

const holidayInstance = axios.create({
  url: API_URL + 'holidays',
  headers: authHeader(),
});

const decryptManagerId = array =>
  array.length > 0 ? array.map(managerObj => decryptUser(managerObj)) : array;

function decryptNestedHolidays(obj) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property === 'managerId') {
        obj[property] = decryptManagerId(obj[property]);
      }
      if (property === 'User') {
        obj[property] = decryptUser(obj[property]);
      }
      if (typeof obj[property] === 'object') {
        decryptNestedHolidays(obj[property]);
      }
    }
  }
}

holidayInstance.interceptors.response.use(res => {
  res.data.forEach(holiday => {
    decryptNestedHolidays(holiday, 'User');
  });
  return res;
});

export { holidayInstance };
