import { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { Button, Modal, Form } from "react-bootstrap";
import { postCreateUser, putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;

  const [ name, setName ] = useState("");
  const [ job, setJob ] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    console.log("check update: ", res);
  }

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log("check res from API CreateUser: ", res)

    if ( res && res.id ) {
        //success
        handleClose();
        setName('');
        setJob('');
        toast.success("A User is created success!");
        handleUpdateTable({first_name: name, id: res.id });
    } else {
        //err
        toast.error("An error...");
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
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
