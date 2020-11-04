import React from 'react';
import { useSelector } from 'react-redux';
import { User } from './user';

const Users = () => {
  const { users } = useSelector(state => state.contentReducer);

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
