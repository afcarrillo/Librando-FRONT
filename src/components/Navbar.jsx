import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CartCanvas from "./CartCanvas";
import { clearCart } from "../state/actions/cartActions";
import { useDispatch } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";
import useInput from "../hooks/useInput";
import logo from "../assets/logo_texto_marron.png";
import { useEffect } from "react";

const NavBar = ({ user }) => {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const query = useInput();
  const [show, setShow] = useState(false);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/genres")
      .then((res) => res.data)
      .then((genres) => setGenres(genres));
  }, []);

  // para abrir y cerrar el panel lateral del carrito
  const handleCanvasClose = () => setShow(false);
  const handleCanvasShow = () => setShow(true);

  // funcionalidad botono "ir a pagar": cierra panel lateral y redirige
  const handleCanvasSubmit = () => {
    handleCanvasClose();
    navigate("/cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.value) navigate(`/search/${query.value}`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    handleCanvasClose();
  };

  return (
    <Navbar bg="color3" expand="md" fixed="top" className="myNavbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt=""
            width="150"
            height="auto"
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>
        <NavDropdown title="Géneros" id="basic-nav-dropdown" className="me-4">
          {genres.length
            ? genres.map((genre, i) => (
                <NavDropdown.Item key={i} as={Link} to={`/books/${genre.name}`}>
                  {genre.name}
                </NavDropdown.Item>
              ))
            : ""}
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to={"/books/all"}>
            Todos
          </NavDropdown.Item>
        </NavDropdown>

        <Navbar.Toggle aria-controls="search-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              size="sm"
              type="search"
              placeholder="Buscá por título o autor"
              className="me-2 mt-2"
              aria-label="Search"
              {...query}
            />

            <Button
              variant="outline-color5"
              size="sm"
              className="mt-2"
              type="submit"
            >
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav>
            <Button
              variant="color5"
              size="sm"
              onClick={handleCanvasShow}
              className="me-2 mt-2"
              style={{ position: "relative" }}
            >
              <i className="bi bi-cart3"></i>
              <span
                style={{ position: "absolute", top: "0px" }}
                className="badge rounded-pill bg-danger"
              >
                {cart.length !== 0 ? cart.length : null}
              </span>
              &nbsp;
            </Button>
            <Offcanvas
              show={show}
              onHide={handleCanvasClose}
              placement="end"
              className="bg-color2"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <i className="bi bi-cart3"></i> Carrito
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="justify-content-center">
                <CartCanvas />
                <br />
                <Row>
                  {cart.length !== 0 ? (
                    <>
                      <Col sm={9}>
                        <Button
                          onClick={handleClearCart}
                          size="sm"
                          variant="color5"
                          id="reload"
                        >
                          Vaciar carrito
                        </Button>
                      </Col>
                      <Col sm={3}>
                        <Button
                          onClick={handleCanvasSubmit}
                          size="sm"
                          variant="color5"
                        >
                          Comprar
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <div>¡Tu carrito está vacío!</div>
                  )}
                </Row>
              </Offcanvas.Body>
            </Offcanvas>
            {user.id ? (
              <>
                <Button
                  size="sm"
                  variant="color5"
                  className="me-2 mt-2"
                  onClick={() => navigate("/user")}
                >
                  <i className="bi bi-person-circle"> </i>
                  {user.name}
                </Button>
                <Button
                  variant="color5"
                  size="sm"
                  className="me-2 mt-2"
                  onClick={() => navigate("/logout")}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="color5"
                  size="sm"
                  className="me-2 mt-2"
                  onClick={() => navigate("/login")}
                >
                  Acceso
                </Button>
                <Button
                  variant="color5"
                  size="sm"
                  className="me-2 mt-2"
                  onClick={() => navigate("/signup")}
                >
                  Registro
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
