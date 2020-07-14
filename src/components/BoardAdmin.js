import React from 'react';

import { Holidays, Requests, Users } from './';

import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

const BoardAdmin = () => {
  //  <div className='container'>
  // <header className='jumbotron'>
  return (
    <Tab.Container id='admin-dash' defaultActiveKey='#requests'>
      <Row>
        <Col>
          <ListGroup horizontal>
            <ListGroup.Item action href='#requests' children='Requests' />
            <ListGroup.Item action href='#users' children='Users' />

            <ListGroup.Item action href='#holidays' children='Holidays' />
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
    //     {/* <Holidays /> */}
    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardAdmin };
