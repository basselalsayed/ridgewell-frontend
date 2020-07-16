import React from 'react';

import { Holidays, Requests, Users } from './';

import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

import { tabBtn } from './admin.module.css';
const BoardAdmin = () => {
  //  <div className='container'>
  // <header className='jumbotron'>
  return (
    <Tab.Container id='admin-dash' defaultActiveKey='#requests'>
      <Row>
        <Col>
          <ListGroup horizontal>
            <ListGroup.Item
              action
              className={tabBtn}
              href='#requests'
              children='Requests'
            />
            <ListGroup.Item
              action
              className={tabBtn}
              href='#users'
              children='Users'
            />

            <ListGroup.Item
              action
              className={tabBtn}
              href='#holidays'
              children='Holidays'
            />
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey='#requests'>
              <Requests />
            </Tab.Pane>
            <Tab.Pane eventKey='#users'>
              <Users />
            </Tab.Pane>
            <Tab.Pane eventKey='#holidays'>
              <Holidays />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardAdmin };
