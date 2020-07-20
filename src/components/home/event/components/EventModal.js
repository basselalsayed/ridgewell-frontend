import React from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';

import { useState } from 'react';
import { RequestForm } from '../../../.';
import { formatted } from '../../../../helpers';

const EventModal = ({ id, handleShow, show, start, end, title, update }) => {
  const [annualLeave, setAnnualLeave] = useState(false);

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
                onChange={() => setAnnualLeave(!annualLeave)}
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
        <Button variant='secondary' onClick={handleShow}>
          Close
        </Button>
        <Button variant='primary' onClick={handleShow}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EventModal };
