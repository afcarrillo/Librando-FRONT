import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

const EditBook = () => {
  
  // const { id } = useParams();
  // const [libro, setLibro] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [generos, setGeneros] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  //traigo todos los libros para editarlos
  // useEffect(() => {
  //   // getBookById();
  //   // setLibro (location.state)
  // }, []);

  const libro = location.state;

  const handleGoBack = () => {
    window.history.back();
  };

  //traigo todos los generos
  useEffect(() => {
    axios.get(`http://localhost:3001/api/genres`, { withCredentials: true }).then((res) => {
      setGeneros(res.data);
    });
  }, []);

  //capturo genero seleccionado
  const handleSelect = (e) => {
    setSelectedGenre(e.target.value);
  };

  // const getBookById = () => {
  //   axios.get(`http://localhost:3001/api/books/${id}`).then((res) => {
  //     setLibro(res.data);
  //   });
  // };

  //edita el libro ya existente
  const handleSubmit = (e) => {
    e.preventDefault();

    //edito libro ya existente
    if (libro) {
     
      axios
        .put(`http://localhost:3001/api/books/change/${libro.id}`, {
          title: e.target[0].value,
          author: e.target[1].value,
          // genre: e.target[2].value,
          genre: selectedGenre || libro.genre.name,
          description: e.target[3].value,
          editorial: e.target[4].value,
          front: e.target[5].value,
          stock: e.target[6].value,
          price: e.target[7].value,
        }, { withCredentials: true })
        .then((res) => {
          alert(`LIBRO EDITADO!: ${res.data.title} ✅`);
        })
        .then(() => {
          navigate(`/book/${libro.id}`);
        });
    }
    //creo libro
    else {
      axios
        .post(`http://localhost:3001/api/books/create`, {
          title: e.target[0].value,
          author: e.target[1].value,
          // genre: e.target[2].value,
          genre: selectedGenre || "",
          description: e.target[3].value,
          editorial: e.target[4].value,
          front: e.target[5].value,
          stock: e.target[6].value,
          price: e.target[7].value,
        },{ withCredentials: true })
        .then((res) => {
          alert(`LIBRO NUEVO CREADO: ${res.data.title} ✅`);
          navigate(`/book/${res.data.id}`);
        });
    }
  };

  return (
    <>
     <Button variant="color5" size="sm" onClick={handleGoBack}>
              Volver
            </Button>
            <br></br><br></br>
    <div className="table-responsive">
      {" "}
      {libro ? (
        <h2 className="mb-5">
          EDITAR LIBRO <i className="bi bi-pencil"></i>
        </h2>
      ) : (
        <h2 className="mb-5">
          AGREGAR NUEVO LIBRO <i className="bi bi-file-earmark-plus"></i>
        </h2>
      )}
      <div style={{ width:"80%", marginLeft: "40px"}}>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Titulo</InputGroup.Text>
          <Form.Control defaultValue={libro ? libro.title : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Autor</InputGroup.Text>
          <Form.Control defaultValue={libro ? libro.author : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Genero</InputGroup.Text>

          {/* <Form.Control defaultValue={libro?libro.genre.name: ""} />  */}

          <Form.Select className="form-select" required aria-label="select example" onChange={handleSelect}>
            <option selected disabled >Elegir...</option>
            {generos.map((genero, i) => {
              return <option key={i}>{genero.name}</option>;
            })}
          </Form.Select>


        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Descripcion</InputGroup.Text>
          <Form.Control defaultValue={libro ? libro.description : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Editorial</InputGroup.Text>
          <Form.Control defaultValue={libro ? libro.editorial : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Portada</InputGroup.Text>
          <Form.Control defaultValue={libro ? libro.front : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Stock</InputGroup.Text>
          <Form.Control type="number" defaultValue={libro ? libro.stock : ""} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" defaultValue={libro ? libro.price : ""} />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <Button variant="primary" type="submit">
          Listo
        </Button>{" "}
      </Form>
      </div>
      </div>
    </>
    
  );
};

export default EditBook;
