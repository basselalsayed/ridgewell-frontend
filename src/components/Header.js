import React, { useState, useEffect } from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import { logOut } from '../actions';
import { connect } from 'react-redux';

const HeaderBase = ({ logOut: logOutRx, user }) => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    user && setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
  }, [user]);

  const adminNavigation = <Nav.Link href={'/admin'}>Admin Board</Nav.Link>;

  const leftNavigation = (
    <>
      {showAdminBoard && adminNavigation}
      <Nav.Link href={'/user'}>User</Nav.Link>
    </>
  );
  const rightNavigation = user ? (
    <>
      <Nav.Link href={'/profile'}>{user.username}</Nav.Link>
      <Nav.Link href={'/login'} onClick={logOutRx}>
        Log Out
      </Nav.Link>
    </>
  ) : (
    <>
      <Nav.Link href={'/login'}>Login</Nav.Link>
      <Nav.Link href={'/register'}>Sign Up</Nav.Link>
    </>
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand href='/'>Ridgewell House</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>{leftNavigation}</Nav>
        <Nav className='ml-auto'>{rightNavigation}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderBase);

export { Header };
