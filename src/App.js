import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import Navigation from './components/Header.js';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector(state => state.authReducer);
  return (
    <Router>
      <Navigation />

      <div className='container mt-3'>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/user' component={BoardUser} />
          <Route path='/mod' component={BoardModerator} />
          <Route path='/admin' component={BoardAdmin} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
