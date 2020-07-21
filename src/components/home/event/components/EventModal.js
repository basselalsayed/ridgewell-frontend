import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';

import { useState } from 'react';
import { RequestForm } from '../../../.';
import { formatted } from '../../../../helpers';
import axios from 'axios';
import { API_URL } from '../../../../constants';
import authHeader from '../../../../services/auth-header';

const EventModal = ({ id, handleShow, show, start, end, title, update }) => {
  const [annualLeave, setAnnualLeave] = useState(!update);

  const handleChange = () => setAnnualLeave(!annualLeave);

  const ENDPOINT = API_URL + `requests/del/${id}`;

  return (
    <Modal show={show} onHide={handleShow}>
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
          }}
          variant='danger'
          style={{
            backgroundColor: '#f8d7da',
            borderColor: '#f5c6cb',
            color: '#721c24',
            cursor: 'pointer',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Delete Holiday
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EventModal };
