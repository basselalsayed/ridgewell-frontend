import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Burger,
  Login,
  Register,
  Home,
  Profile,
  BoardUser,
  BoardAdmin,
  Header,
} from './components';

import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector(state => state.authReducer);
  return (
    <Router>
      <Header />

      <div>
        {/* <Burger /> */}
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/user' component={BoardUser} />
            <Route path='/admin' component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
