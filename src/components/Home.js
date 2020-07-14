import React, { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { getUsers } from '../store/actions/content';
import { connect, useSelector } from 'react-redux';
import authHeader from '../store/actions/auth-header';
import axios from 'axios';

const UsersBase = ({ users }) =>
  users && (
    <div>
      {users.map(user => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );

const mapStateToProps = state => ({
  users: state.contentReducer.users,
});

const Users = connect(mapStateToProps)(UsersBase);

const User = ({ email, id, password, updatedAt, username }) => (
  <Card>
    <Card.Title>{username}</Card.Title>
    <Card.Body>
      <p> {id} </p>
      <p> {email} </p>
      <p> {password} </p>
      <p> {updatedAt} </p>
    </Card.Body>
  </Card>
);

const Home = ({ getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {/* <header className='jumbotron'> */}
      <Users />
      {/* </header> */}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(null, mapDispatchToProps)(Home);
