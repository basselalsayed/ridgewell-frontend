import axios from 'axios';
import { API_URL } from '../constants';
import { decrypt } from '../helpers';
import authHeader from './auth-header';

const holidayInstance = axios.create({
  url: API_URL + 'holidays',
  headers: authHeader(),
});

function decryptNestedUsers(obj) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property === 'managerId') {
        obj[property].length > 0 &&
          obj[property].forEach(managerObj => {
            let { email, username } = managerObj;

            managerObj.email = decrypt(email);
            managerObj.username = decrypt(username);
          });
      }

      if (property === 'User') {
        let { email, username } = obj.User;

        obj.User.email = decrypt(email);
        obj.User.username = decrypt(username);
      }
      if (typeof obj[property] === 'object') {
        decryptNestedUsers(obj[property]);
      }
    }
  }
}

holidayInstance.interceptors.response.use(({ data }) => {
  data.forEach(holiday => {
    decryptNestedUsers(holiday, 'User');
  });

  return data;
});

export { holidayInstance };
