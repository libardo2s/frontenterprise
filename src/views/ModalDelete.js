import { Modal, Button } from "react-bootstrap";
function ModalDelete({ open, setOpen, deleteEnterprise, id }) {
  return (
    <Modal show={open}>
      <Modal.Header closeButton>
        <Modal.Title>Seguro desea eliminar esta empresa</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => deleteEnterprise(id)}>
          Si
        </Button>
        <Button variant="primary" onClick={() => setOpen(!open)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
