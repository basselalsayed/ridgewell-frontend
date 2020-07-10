import React, { useState, useEffect } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import AuthService from '../services/auth.service';

const logOut = () => {
  AuthService.logout();
};

const Navigation = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const adminNavigation = <Nav.Link href={'/admin'}>Admin Board</Nav.Link>;

  const leftNavigation = (
    <>
      {showAdminBoard && adminNavigation}
      <Nav.Link href={'/user'}>User</Nav.Link>
    </>
  );
  const rightNavigation = currentUser ? (
    <>
      <Nav.Link href={'/profile'}>{currentUser.username}</Nav.Link>
      <Nav.Link href={'/login'} onClick={logOut}>
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

export default Navigation;
