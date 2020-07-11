import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';
import { Card } from 'react-bootstrap';

const Users = ({ users }) =>
  users.length ? users.forEach(user => <User key={user.id} {...user} />) : null;

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

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getPublicContent()
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      });
  }, []);

  return (
    <div>
      {/* <header className='jumbotron'> */}
      {content.length &&
        content.forEach(user => <User key={user.id} {...user} />)}
      {content && console.log(content, content.length)}
      {/* </header> */}
    </div>
  );
};

export default Home;
