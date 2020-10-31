import React, { useState } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { RequestForm } from '../../../.';
import { formatted } from '../../../../helpers';
import { getHolidays } from '../../../../store/actions';
import { API_URL } from '../../../../constants';
import authHeader from '../../../../services/auth-header';

import { dangerBtn } from '../../../index.module.css';

const EventModal = ({ id, handleShow, show, start, end, title, update }) => {
  const [annualLeave, setAnnualLeave] = useState(!update);

  const dispatch = useDispatch();

  const handleChange = () => setAnnualLeave(!annualLeave);

  const ENDPOINT = API_URL + `requests/del/${id}`;

  return (
    <Modal show={show} onHide={handleShow} centered>
      <Modal.Header closeButton>
        <Row style={{ width: '80%' }}>
          <Col>
            <Modal.Title>{title}</Modal.Title>
          </Col>
          <Col>
            {!update && (
              <Form.Switch
                id='annualLeave-switch'
                label='Annual Leave'
                checked={annualLeave}
                onChange={handleChange}
              />
            )}
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <RequestForm
          id={id}
          from={formatted(start, 'form')}
          until={formatted(end, 'form')}
          update={update}
          annualLeave={annualLeave}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            axios
              .post(ENDPOINT, {}, { headers: authHeader() })
              .then(res => console.log('res', res))
              .catch(err => console.log(err.message));

            dispatch(getHolidays());
          }}
          className={dangerBtn}
        >
          Delete Holiday
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EventModal };
