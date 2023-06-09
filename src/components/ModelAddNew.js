import { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { Button, Modal, Form } from "react-bootstrap";

const ModalAddNew = (props) => {
  const { show, handleClose } = props;

  const [ name, setName ] = useState("");
  const [ job, setJob ] = useState("");

 const handleSaveUser = () => {
    console.log("check state submit: ", "name =", name, "job =", job)
 }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jobs:</Form.Label>
              <Form.Control
              type="text"
              placeholder="Jobs"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
