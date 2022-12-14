import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardBook from "./Card";
import Pagination from "./Pagination";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Grid = () => {
  const { type, query } = useParams();
  const [libros, setLibros] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const forPage = 12

  
  useEffect(() => {
    setInput(1);
    setPage(1);

    let ruta;

    if (type) {
      if (type === "all") ruta = `books`;
      else ruta = `genres/list/${type}`;
    }
    if (query) ruta = `books/search/${query}`;

    axios
      .get(`http://localhost:3001/api/${ruta}`)
      .then((res) => res.data)
      .then((books) => {
        setLibros(books);
      });
  }, [type, query]);

  const max = libros.length / forPage;

  return (
    <div>
      <div className="paginacion">
        <Pagination
          page={page}
          setPage={setPage}
          max={max}
          input={input}
          setInput={setInput}
        />
      </div>
      <br />
      <Container>
        <Row>
          {libros
            .slice((page - 1) * forPage, (page - 1) * forPage + forPage)
            .map((book, i) => (
              <Col lg={3} md={4} sm={6} key={i}>
                <CardBook book={book} />
              </Col>
            ))}
        </Row>
      </Container>
      <br />
      <div className="paginacion">
        <Pagination
          page={page}
          setPage={setPage}
          max={max}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default Grid;
