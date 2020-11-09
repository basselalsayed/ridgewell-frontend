import React from 'react';
import { User } from './user';

const Users = ({ users }) => (
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
);

export { Users };
