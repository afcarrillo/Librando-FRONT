import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginRequest } from "../state/user";

import useInput from "../hooks/useInput";

import { Button, Form, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pageBack = useLocation().state;

  // si ya hay un usuario logueado redirige a home
  useEffect(() => {
    if (user.id) navigate("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // seteamos el user en redux y redirigimos al home si todo va bien
    dispatch(
      sendLoginRequest({ email: email.value, password: password.value })
    ).then((res) => {
      if (res.payload) {
        if (pageBack) navigate(pageBack);
        else navigate("/");
      }
    });
  };

  const handleClick = () => {
    // seteamos el user en redux y redirigimos al home si todo va bien
    dispatch(
      sendLoginRequest({ email: "admin@admin.com", password: "1234" })
    ).then(() => navigate("/"));
  };

  return (
    <>
      <h2 className="mb-4">Ingresa a tu cuenta</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel label="E-mail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="E-mail"
              // incluimos propiedades value y onChange de email => useInput hook => (useState)
              {...email}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel label="Contraseña" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              {...password}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <div className="logginButtons">
          <Button variant="color5" type="submit">
            Acceder
          </Button>
          <Button variant="color3" onClick={handleClick}>
            Admin
          </Button>
        </div>
        <div className="mt-2">
          <small>
            ¿No tenés una cuenta?{" "}
            <Link to="/signup" className="text-color6">
              Registrate
            </Link>
            .
          </small>
        </div>
      </Form>
    </>
  );
};

export default Login;
