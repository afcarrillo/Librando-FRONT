import React from "react";
import { Link } from "react-router-dom";

import { ListGroup } from "react-bootstrap";

const AdminPanel = () => {
  return (
    <>
      <h5 className="mt-3 ps-2">Panel de Administrador</h5>
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          as={Link}
          to="/admin/users"
          className="bg-color5 text-white d-flex justify-content-md-start justify-content-center"
        >
          <i className="bi bi-people"> Usuarios</i>
        </ListGroup.Item>

        <ListGroup.Item
          action
          as={Link}
          to="/admin/books"
          className="bg-color5 text-white d-flex justify-content-md-start justify-content-center"
        >
          <i className="bi bi-book"> Libros</i>
        </ListGroup.Item>

        <ListGroup.Item
          action
          as={Link}
          to="/admin/genres"
          className="bg-color5 text-white d-flex justify-content-md-start justify-content-center"
        >
          <i className="bi bi-bookmarks"> Generos</i>
        </ListGroup.Item>

        <ListGroup.Item
          action
          as={Link}
          to="/admin/orders"
          className="bg-color5 text-white d-flex justify-content-md-start justify-content-center"
        >
          <i className="bi bi-list-ul"> Ordenes</i>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default AdminPanel;
