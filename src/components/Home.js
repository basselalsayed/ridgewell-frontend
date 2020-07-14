import React, { useEffect } from 'react';

import { getUsers } from '../store/actions/content';
import { connect } from 'react-redux';

import Users from './users';

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
