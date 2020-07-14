import React from 'react';
import AuthService from '../services/auth.service';
import { connect, useSelector } from 'react-redux';

const ProfileBase = ({ user }) => {
  return (
    <div className='container'>
      {user && (
        <>
          <header className='jumbotron'>
            <h3>
              <strong>{user.username}</strong> Profile
            </h3>
          </header>
          <p>
            {/* <strong>Token:</strong> {user.accessToken.substring(0, 20)} ...{' '} */}
            {/* {user.accessToken.substr(user.accessToken.length - 20)} */}
          </p>
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {user.roles &&
              user.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

const Profile = connect(mapStateToProps)(ProfileBase);

export { Profile };
