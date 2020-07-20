import React from 'react';
import { Modal, Col, Row, Form } from 'react-bootstrap';

import { useState } from 'react';
import { RequestForm } from '../../../.';
import { formatted } from '../../../../helpers';

const EventModal = ({ id, handleShow, show, start, end, title, update }) => {
  const [annualLeave, setAnnualLeave] = useState(!update);

  const handleChange = () => setAnnualLeave(!annualLeave);

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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export { EventModal };
