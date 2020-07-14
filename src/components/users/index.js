import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import User from './user';
import { getUsers } from '../../store/actions/content';

const Users = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    users && (
      <div>
        {users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
    )
  );
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
});
const mapStateToProps = state => ({
  users: state.contentReducer.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
