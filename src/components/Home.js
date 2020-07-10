import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';
import { Card } from 'react-bootstrap';

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent(response.data);
      },
      error => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      },
    );
  }, []);

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

  return (
    <div>
      {/* <header className='jumbotron'> */}
      {content && content.forEach(user => <User key={user.id} {...user} />)}
      {/* </header> */}
    </div>
  );
};

export default Home;
