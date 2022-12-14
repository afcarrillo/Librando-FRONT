import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";

const EditUser = () => {
  const { id } = useParams();
  const user = useLocation().state;
  /*  const [user, setUser] = useState({}); */

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);

  const address = user.address.split(",");

  const handleSubmit = (e) => {
    e.preventDefault();

    const direccion = `${e.target[3].value},${e.target[4].value},${e.target[5].value},${e.target[6].value},${e.target[7].value},${e.target[8].value}`;

    axios
      .put(`http://localhost:3001/api/users/${id}`, {
        name: e.target[0].value,
        lastname: e.target[1].value,
        email: e.target[2].value,
        address: direccion,
        isAdmin: e.target[9].value,
      })
      .then(() => {
        alert(`Modificado!: ${user.name} ✅`);
      })
      .then(() => {
        navigate("/admin/users");
      });
  };

  return (
    <>
      {id ? (
        <h2 className="mb-5">
          Editar <i className="bi bi-pencil"></i>
        </h2>
      ) : (
        ""
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              defaultValue={user.name}
              required
              type="text"
              placeholder="Nombre"
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un nombre.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              defaultValue={user.lastname}
              required
              type="text"
              placeholder="Apellido"
              /*  {user.lastname} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un apellido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              defaultValue={user.email}
              required
              type="email"
              placeholder="Email"
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce mail ejemplo@ejemplo.com
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="8" controlId="validationCustom04">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              defaultValue={address[0]}
              type="text"
              placeholder="Direccion"
              required
              /* {...dir} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una direccion.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustom05">
            <Form.Label>Num.</Form.Label>
            <Form.Control
              defaultValue={address[1]}
              type="text"
              placeholder="Num."
              required /* {...num} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un numero.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustom06">
            <Form.Label>Dpto.</Form.Label>
            <Form.Control
              defaultValue={address[2]}
              type="text"
              placeholder="Dpto." /* {...dpto}  */
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              defaultValue={address[3]}
              type="text"
              placeholder="Ciudad"
              required /* {...city} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una ciudad.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom08">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              defaultValue={address[4]}
              type="text"
              placeholder="Provincia"
              required
              /* {...state} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una provincia.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom09">
            <Form.Label>CPA</Form.Label>
            <Form.Control
              defaultValue={address[5]}
              type="text"
              placeholder="CPA"
              required /* {...cpa} */
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un codigo postal.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            label="Permisos de administrador"
            value={admin}
            onChange={() => setAdmin(!admin)}
          />
        </Form.Group>
        <Button variant="color5" type="submit">
          Edit
        </Button>
      </Form>
    </>
  );
};

export default EditUser;
