import React, { useEffect } from 'react';

import { Holidays, Requests, Users } from './';

import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

import { tabBtn } from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../store/actions';
import { CenteredSpinner } from './Spinner';

const BoardAdmin = () => {
  const dispatch = useDispatch();

  let { holidays, requests, users } = useSelector(
    state => state.contentReducer,
  );

  useEffect(() => {
    dispatch(getAll());
  }, []);

  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
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
  );

  const tabContent = (
    <Row>
      <Col>
        {holidays && requests && users ? (
          <Tab.Content>
            <Tab.Pane eventKey='#requests'>
              <Requests requests={requests} />
            </Tab.Pane>
            <Tab.Pane eventKey='#users'>
              <Users users={users} />
            </Tab.Pane>
            <Tab.Pane eventKey='#holidays'>
              <Holidays holidays={holidays} />
            </Tab.Pane>
          </Tab.Content>
        ) : (
          <CenteredSpinner />
        )}
      </Col>
    </Row>
  );

  return (
    <Tab.Container id='admin-dash' defaultActiveKey='#requests'>
      {tabButtons}
      {tabContent}
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardAdmin };
