import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalEdit = (props) => {
    const { show, handleClose, dataUserEdit } = props;
    const [ name, setName ] = useState("");
    const [ job, setJob ] = useState("");

    const handleEditUser = () => {

    }

    useEffect(() => {
        if(show) { // when close modal, it dont run
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit])

    console.log("check dataUserEdit: ", dataUserEdit);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
