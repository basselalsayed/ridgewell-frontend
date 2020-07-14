import React from 'react';
import { connect } from 'react-redux';
import User from './user';

const Users = ({ users }) =>
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

export default connect(mapStateToProps)(Users);
