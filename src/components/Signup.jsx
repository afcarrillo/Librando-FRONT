import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginRequest } from "../state/user";
import axios from "axios";

import useInput from "../hooks/useInput";

import { Button, Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const [validated, setValidated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const name = useInput();
  const lastname = useInput();
  const dni = useInput();
  const email = useInput();
  const password = useInput();
  const dir = useInput();
  const num = useInput();
  const dpto = useInput();
  const city = useInput();
  const state = useInput();
  const cpa = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // si ya hay un usuario logueado redirige a home
  useEffect(() => {
    if (user.id && !user.isAdmin) navigate("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const address = `${dir.value},${num.value},${dpto.value},${city.value},${state.value},${cpa.value}`;
      axios
        .post("http://localhost:3001/api/users/register", {
          name: name.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
          dni: dni.value,
          address,
          isAdmin: admin,
        })
        .then((res) => res.data)
        .then(({ email }) => {
          // tras el registro hacemos login automatico y redirigimos a home

          if (user.isAdmin) {
            navigate("/admin/users");
          } else {
            dispatch(sendLoginRequest({ email, password: password.value }));
            navigate("/");
          }
        })
        .catch((error) => {
          const detail = error.response.data.original.detail;
          alert(detail);
        });
    }
    setValidated(true);
  };

  return (
    <>
      {user.id && user.isAdmin ? (
        <>
          <h2>Hola {user.name},</h2> <p>puedes crear desde aqui!</p>
        </>
      ) : (
        <div>
          <h2 className="is-title is-size-2">Registrate</h2>
          <p>
            Completá el formulario para comenzar. <br />
            <small className="mb-6">
              ¿Ya tenés una cuenta?{" "}
              <Link to="/login" className="text-color6">
                Ingresá
              </Link>
            </small>
          </p>
        </div>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" placeholder="Nombre" {...name} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un nombre.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Apellido"
              {...lastname}
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un apellido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>DNI</Form.Label>
            <Form.Control required type="text" placeholder="DNI" {...dni} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un DNI.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              {...email}
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce mail ejemplo@ejemplo.com
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              {...password}
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una contraseña.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="8" controlId="validationCustom04">
            <Form.Label>Calle</Form.Label>
            <Form.Control type="text" placeholder="Calle" required {...dir} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una calle.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustom05">
            <Form.Label>Num.</Form.Label>
            <Form.Control type="text" placeholder="Num." required {...num} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un numero.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustom06">
            <Form.Label>Dpto.</Form.Label>
            <Form.Control type="text" placeholder="Dpto." {...dpto} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" placeholder="Ciudad" required {...city} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una ciudad.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom08">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Provincia"
              required
              {...state}
            />
            <Form.Control.Feedback type="invalid">
              Por favor introduce una provincia.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom09">
            <Form.Label>CPA</Form.Label>
            <Form.Control type="text" placeholder="CPA" required {...cpa} />
            <Form.Control.Feedback type="invalid">
              Por favor introduce un codigo postal.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Acepto términos y condiciones"
            feedback="Debes aceptar para poder registrarte."
            feedbackType="invalid"
          />
          {user.isAdmin ? (
            <Form.Check
              label="Permisos de administrador"
              value={admin}
              onChange={() => setAdmin(!admin)}
            />
          ) : (
            ""
          )}
        </Form.Group>
        <Button variant="color5" type="submit">
          Registro
        </Button>
      </Form>
    </>
  );
};

export default Signup;
