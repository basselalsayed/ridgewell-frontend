import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './containers';
import axios from 'axios';
import authHeader from './services/auth-header';
import { API_URL } from './constants';

axios.defaults.baseURL = API_URL;
axios.defaults.headers = authHeader();
axios.defaults.timeout = 4000;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
