import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  const { user } = useSelector(state => state.authReducer);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
