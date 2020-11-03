import authReducer from './auth';
import contentReducer from './content';

import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  contentReducer,
});
