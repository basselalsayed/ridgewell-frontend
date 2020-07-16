import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EventModal = ({ handleShow, show, title }) => (
  <Modal show={show} onHide={handleShow}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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

export { EventModal };
