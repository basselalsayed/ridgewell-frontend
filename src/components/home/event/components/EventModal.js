import React from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';

import { format } from 'date-fns';
import { useState } from 'react';
import { RequestForm } from '../../../.';

const EventModal = ({ handleShow, show, start, end, title, update }) => {
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
          from={format(new Date(start), 'yyyy-MM-dd')}
          until={format(new Date(end), 'yyyy-MM-dd')}
          update={update}
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
