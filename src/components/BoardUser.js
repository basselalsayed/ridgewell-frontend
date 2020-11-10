import React, { useEffect } from 'react';

import { Holidays, Notifications, Requests } from './';

import { Tab, Row, Col, ListGroup, Spinner } from 'react-bootstrap';

import { tabBtn } from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../store/actions';
import { setError } from '../store/actions/response';

const BoardUser = () => {
  const {
    authReducer: { user },
    responseReducer: { error },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    user ? dispatch(getAll(user.id)) : dispatch(setError('No User logged in'));
  }, [dispatch, user]);

  let { holidays, notifications, requests } = useSelector(
    state => state.contentReducer,
  );

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
            href='#holidays'
            children='Holidays'
          />
          <ListGroup.Item
            action
            className={tabBtn}
            href='#notifications'
            children='Notifications'
          />
        </ListGroup>
      </Col>
    </Row>
  );

  const tabContent = (
    <Row>
      <Col>
        {error ? null : holidays && requests && notifications ? (
          <Tab.Content>
            <Tab.Pane eventKey='#requests'>
              <Requests requests={requests} />
            </Tab.Pane>
            <Tab.Pane eventKey='#holidays'>
              <Holidays holidays={holidays} />
            </Tab.Pane>
            <Tab.Pane eventKey='#notifications'>
              <Notifications notifications={notifications} />
            </Tab.Pane>
          </Tab.Content>
        ) : (
          <Spinner
            style={{
              position: 'inherit',
              color: 'green',
              left: '50%',
              top: '50%',
              marginLeft: '-1rem',
              marginTop: '1rem',
            }}
            animation='border'
          />
        )}
      </Col>
    </Row>
  );

  return (
    <Tab.Container id='user-dash' defaultActiveKey='#requests'>
      {tabButtons}
      {tabContent}
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardUser };
