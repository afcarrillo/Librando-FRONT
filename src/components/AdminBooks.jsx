import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../commons/Pagination";

const AdminBooks = () => {
  const [libros, setLibros] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const forPage = 12

  //traigo todos los libros para editarlos
  useEffect(() => {
    setInput(1);
    setPage(1);
    getBooksAll();
  }, []);

  const getBooksAll = () => {
    axios
      .get(`http://localhost:3001/api/books/`)
      .then((res) => res.data)
      .then((books) => {
        setLibros(books);
      });
  };


  // evento de "soft delete", es decir no es un delete sino un update
  const deleteBook = (id) => {
    axios
      .put(`http://localhost:3001/api/books/delete/${id}`, { withCredentials: true })
      .then(() => {
        alert("ELIMINADO!");
      })
      .then(() => {
        getBooksAll();
      });
  };

  const max = libros.length / forPage;

  return (

 

    <div className="table-responsive" style={{ padding: "5%"}}>
     
      <Container  >

        <Row>
          <Link to={`/admin/books/create`}>
            <Button variant="success">Agregar nuevo libro </Button>
          </Link>
        </Row>
        <br></br>
        <div>
          <Container>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Id</th>
                  <th>Titulo</th>
                  <th>Portada</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {libros
                  .slice((page - 1) * forPage, (page - 1) * forPage + forPage)
                  .map((book, i) => (
                    <tr
                      key={i}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>
                        <img style={{ width: "55%" }} src={book.front} alt="front"/>
                      </td>
                      <td>${book.price}</td>
                      <td>{book.stock}</td>
                      <td>
                        <Link state={book} to={`/admin/books/edit/${book.id}`}>
                          <i className="bi bi-pencil"></i>
                        </Link>{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteBook(book.id);
                          }}
                          className="bi bi-trash3 text-danger"
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </div>
        {/* <div>
          <Pagination size="sm">{items}</Pagination>
          <br />
        </div> */}
        <div className="paginacion">
          <Pagination
            page={page}
            setPage={setPage}
            max={max}
            input={input}
            setInput={setInput}
          />
        </div>
      </Container>
    </div>
  );
};

export default AdminBooks;
