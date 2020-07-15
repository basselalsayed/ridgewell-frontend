import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { User } from './user';
import { getUsers } from '../../actions';
import { CardColumns } from 'react-bootstrap';

const UsersBase = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    users && (
      <div
        style={{
          maxHeight: window.innerHeight - 150,
          overflow: 'auto',
        }}
      >
        {users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
    )
  );
};

const mapStateToProps = state => ({
  users: state.contentReducer.users,
});
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
});
const Users = connect(mapStateToProps, mapDispatchToProps)(UsersBase);

export { Users };
