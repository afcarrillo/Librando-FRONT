import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container fluid className="bg-color5">
        <Row className="text-center text-white">
          <section className="fs-6">
            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-twitter"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-google"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-linkedin"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-white m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-github"></i>
            </a>
          </section>
        </Row>
        <Row className="text-white text-center">
          <section className="my-1">
            © 2022 Copyright:{" "}
            <a className="text-white" href="https://www.plataforma5.la/">
              Librando Team - Plataforma 5
            </a>
          </section>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
