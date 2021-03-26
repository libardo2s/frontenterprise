import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import domain from "../config/domain";
import { useAlert } from "react-alert";

function List() {
  const [enterpriseList, setList] = useState([]);
  const [enterpriseSelect, setEnterpriseSelect] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const alert = useAlert();

  const deleteEnterprise = (id) => {
    fetch(`${domain.uri}/enterprise/${id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((dataResponse) => {
        const { isOk, message } = dataResponse;
        if (isOk) {
          alert.show(message, { type: "success" });
          setOpenDelete(!openDelete);
          setList((prev) =>
            prev.filter((item) => item.id !== enterpriseSelect.id)
          );
        }
      });
  };

  const updateEnterprise = (id, data) => {
    fetch(`${domain.uri}/enterprise/${id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dataResponse) => {
        const { message, isOk, content } = dataResponse;
        if (isOk) {
          alert.show(message, { type: "success" });
          setOpenEdit(!openEdit);
          setList((prev) =>
            prev.map((item) => {
              if (item.id === content.id) item = content;
              return item;
            })
          );
        } else alert.show(message, { type: "error" });
      });
  };

  useEffect(() => {
    fetch(`${domain.uri}/enterprise/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((dataResponse) => {
        const { isOk, content } = dataResponse;
        if (isOk) setList(content);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Lista de Empresas</h1>
      <ModalDelete
        deleteEnterprise={deleteEnterprise}
        open={openDelete}
        setOpen={setOpenDelete}
        id={enterpriseSelect?.id}
      />
      <ModalEdit
        open={openEdit}
        setOpen={setOpenEdit}
        enterprise={enterpriseSelect}
        updateEnterprise={updateEnterprise}
      />
      <Row>
        {enterpriseList.map((enterprise) => (
          <Col md={4} key={enterprise?.id}>
            <Card border="info" style={{ width: "18rem" }}>
              <Card.Header>{enterprise?.nit}</Card.Header>
              <Card.Body>
                <Card.Title>{enterprise?.name}</Card.Title>
                <Card.Text>Phone: {enterprise?.phone}</Card.Text>
                <Card.Text>Address: {enterprise?.address}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setOpenEdit(true);
                        setEnterpriseSelect(enterprise);
                      }}
                    >
                      Actualizar
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setOpenDelete(true);
                        setEnterpriseSelect(enterprise);
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            <br></br>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default List;
