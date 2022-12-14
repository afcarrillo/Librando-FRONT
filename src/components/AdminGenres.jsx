import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { InputGroup, Form, Button, Table } from "react-bootstrap";
import useInput from "../hooks/useInput";

const AdminGenres = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const newGenre = useInput();
  const navigate = useNavigate();

  useEffect(() => {
    user && user.isAdmin ? fetchGenres() : navigate("/");
  }, [user, navigate]);

  const fetchGenres = () => {
    axios
      .get("http://localhost:3001/api/genres")
      .then((res) => res.data)
      .then((genres) => setGenres(genres));
  };

  const addGenre = () => {
    newGenre.value !== ""
      ? axios
          .post(
            `http://localhost:3001/api/genres/create`,
            {
              name: newGenre.value,
            },
            { withCredentials: true }
          )
          .then(() => fetchGenres())
      : alert("Ingresa un género");
  };

  const deleteGenre = (id) => {
    axios
      .get(`http://localhost:3001/api/genres/list/${id}`)
      .then((res) => res.data)
      .then((booksByGenre) =>
        booksByGenre.length
          ? alert(
              "No puede eliminar. Hay productos pertencientes a este género"
            )
          : axios
              .delete(`http://localhost:3001/api/genres/delete/${id}`, {
                withCredentials: true,
              })
              .then(() => fetchGenres())
      );
  };

  return (
    <div className="table-responsive">
      <h5>
        <strong>Listado de Géneros</strong>
      </h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th className="text-center">Editar</th>
            <th className="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {genres.length ? (
            genres.map((genre, i) => {
              return (
                <tr key={i}>
                  <td>{genre.id}</td>
                  <td>{genre.name}</td>
                  <td className="text-center">
                    <Link to={`/admin/genres/edit/${genre.id}`} state={genre}>
                      <i className="bi bi-pencil text-primary"></i>
                    </Link>
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-trash3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteGenre(genre.id)}
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      <InputGroup className="mb-3">
        <Form.Control required type="text" placeholder="Genero" {...newGenre} />
        <Form.Control.Feedback type="invalid">
          Por favor ingresa un género.
        </Form.Control.Feedback>
        <Button variant="primary" type="submit" onClick={addGenre}>
          <i className="bi bi-bookmark-plus"> Añadir</i>
        </Button>
      </InputGroup>
    </div>
  );
};

export default AdminGenres;
