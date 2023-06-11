import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;

  const handleDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if(res && +res.statusCode === 204){ // + is convert state to int in case it'snt int
        toast.success("Delete user successed!");
        handleClose();
        handleDeleteUserFromModal(dataUserDelete); // refesh table user (real project dont need this handle)
    } else {
        toast.error("Error delete user!");
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
          <Modal.Title>Modal Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-delete">
            <h3>Are you sure to delete</h3>
            Email: {dataUserDelete.email} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
