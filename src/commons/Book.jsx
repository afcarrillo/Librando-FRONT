import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Col, Row, Stack, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/actions/cartActions";

function Book({ book, history }) {
  const dispatch = useDispatch();
  const [puntuacion, setPuntuacion] = useState (0)

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const estrellas = (num) =>{
  if(num ===1){return "⭐"}
  if(num ===2){return "⭐⭐"}
  if(num ===3){return "⭐⭐⭐"}
  if(num ===4){return "⭐⭐⭐⭐"}
  if(num ===5){return "⭐⭐⭐⭐⭐"} }

  useEffect(() => {
      axios
        .get(`http://localhost:3001/api/reviews/rates/${book.id}`)
        .then((res) => res.data[0].promedio)
        .then((promedio) => setPuntuacion(promedio))  
      }, [book]);



  return (
    <div className="table-responsive">
      <Container>
        <Row>
          <Col md={1}>
            <Button variant="color5" size="sm" onClick={handleGoBack}>
              Volver
            </Button>
          </Col>
          <Col>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              {book.title}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col md={5} className="mb-4">
            <img src={book.front} alt="img" style={{width:"500px"}}></img>
          </Col>
          <Col md={7}>
            <Stack gap={1}>
              <p>
                <strong>Autor:</strong> {book.author}
              </p>
              <p>
                <strong> Genero:</strong> {book.genre ? book.genre.name : ""}
              </p>
              <p>
                <strong>Descripción:</strong> {book.description}
              </p>
              <p>
                <strong>Editorial:</strong> {book.editorial}
              </p>
              <p>
                <strong>Rate:</strong> {puntuacion ? estrellas(puntuacion) : "No hay criticas aún"}
              </p>
              <p>
                <strong>Stock:</strong> {book.stock}
              </p>
              <p>
                <strong>Precio:</strong> ${book.price ? book.price.toFixed(2) : ""}
              </p>
              <div style={{ marginTop: "10px" }}>
                <Button variant="color5" onClick={handleAddToCart}>
                  Agregar al carrito
                </Button>
              </div>
            </Stack>
          </Col>
        </Row>

        <Row id="quantity"></Row>
      </Container>
    </div>
  );
}

export default Book;
