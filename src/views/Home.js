import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import domain from "../config/domain";
import { useAlert } from "react-alert";

function Home() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nit, setNit] = useState("");
  const [address, setAddress] = useState("");

  const alert = useAlert();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = { name, phone, nit, address };

      fetch(`${domain.uri}/enterprise/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((dataResponse) => {
          const { message, isOk } = dataResponse;
          if (isOk) alert.show(message, { type: "success" });
          else alert.show(message, { type: "error" });
        });
    }
    setValidated(true);
  };

  return (
    <div className="container">
      <h1 className="text-center">Registrar Empresa</h1>
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
                console.log(event.target.value);
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
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default Home;
