import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import useInput from "../hooks/useInput";
import { InputGroup, Form, Button } from "react-bootstrap";

const EditGenre = () => {
  const navigate = useNavigate();
  const { id, name } = useLocation().state;
  const genre = useInput();

  const editGenre = () => {
    genre.value !== ""
      ? axios
          .put(
            `http://localhost:3001/api/genres/change/${id}`,
            {
              name: genre.value,
            },
            { withCredentials: true }
          )
          .then(() => navigate("/admin/genres"))
      : alert("Ingresa un género");
  };
  return (
    <>
      <h5>
        <strong>Editar género</strong>
      </h5>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={name}
          aria-label="Recipient's username"
          {...genre}
        />
        <Button variant="danger" onClick={() => navigate("/admin/genres")}>
          <i className="bi bi-x-lg"></i>
        </Button>
        <Button variant="primary" onClick={editGenre}>
          <i className="bi bi-bookmark-plus"> Modificar</i>
        </Button>
      </InputGroup>
    </>
  );
};

export default EditGenre;
