import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

function ModalEdit({ open, setOpen, enterprise, updateEnterprise }) {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nit, setNit] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(false);
    } else {
      const data = { name, phone, nit, address };
      updateEnterprise(enterprise.id, data);
    }
    setValidated(true);
  };

  useEffect(() => {
    setName(enterprise?.name || "");
    setNit(enterprise?.nit || "");
    setAddress(enterprise?.address || "");
    setPhone(enterprise?.phone || "");
  }, [enterprise]);

  return (
    <Modal show={open} onHide={() => setOpen(!open)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                placeholder="Nombre"
                required
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Nombre es requerido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                placeholder="NIT"
                required
                name="nit"
                maxLength={10}
                value={nit}
                onChange={(event) => {
                  if (Number(event.target.value)) setNit(event.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                NIT es requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                placeholder="Dirección"
                required
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Dirección es requerida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                placeholder="Telefono"
                required={true}
                maxLength={10}
                name="phone"
                value={phone}
                onChange={(event) => {
                  if (Number(event.target.value)) setPhone(event.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Dirección es requerida
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Actualizar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalEdit;
