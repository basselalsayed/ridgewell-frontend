import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from './user';
import { getUsers } from '../../actions';

const Users = () => {
  const { users } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
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

export { Users };
