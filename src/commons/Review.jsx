import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StarRating from "./StarRating/StarRating";

const Review = ({ book }) => {
  const [rating, setRating] = useState();
  const newRating = (rate) => {
    setRating(rate);
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [comprado, setComprado] = useState(false);
  const [revisado, setRevisado] = useState(false);
  const [reviews, setReviews] = useState([]);

  // //Crear review
  const handleSubmit = (e) => {
    axios
      .post(`http://localhost:3001/api/reviews/new`, {
        comment: e.target[0].value,
        rate: rating,
        userId: user.id,
        bookId: book.id,
      })
      .then((res) => {
        // alert(`RESEÑA CREADA: ${res.data.title} ✅`);
        navigate(`/book/${book.id}`);
      });
  };

  const buscarComprados = () => {
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].book_orders.length; j++) {
        if (orders[i].book_orders[j].bookId === book.id) {
          return true;
        }
      }
    }
    return false;
  };

  const buscarRevisado = () => {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userId === user.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setComprado(buscarComprados());
    setRevisado(buscarRevisado());
  }, [orders, reviews]);

  // Traer todas las reseñas de un libro

  useEffect(() => {
    if (user && book)
      axios
        .get(`http://localhost:3001/api/order/userOrders/${user.id}`)
        .then((res) => res.data)
        .then((orders) => setOrders(orders))

        .then(() => {
          if (book.id)
            axios
              .get(`http://localhost:3001/api/reviews/${book.id}`)
              .then((res) => res.data)
              .then((reviews) => setReviews(reviews));
        });
  }, [user, book]);

  const estrellas = (num) => {
    if (num === 1) {
      return "⭐";
    }
    if (num === 2) {
      return "⭐⭐";
    }
    if (num === 3) {
      return "⭐⭐⭐";
    }
    if (num === 4) {
      return "⭐⭐⭐⭐";
    }
    if (num === 5) {
      return "⭐⭐⭐⭐⭐";
    }
  };

  return (
    //input para agregar review
    <>
      <p>
        {/* Lo compro? {comprado.toString().toUpperCase()} Hizo review? */}
        {/* {revisado.toString().toUpperCase()} */}
      </p>
      {comprado && !revisado ? (
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>
              <h3>Dejar reseña</h3>
            </Form.Label>
            <Form.Control type="text" placeholder="Contanos que te parecio!" />
          </Form.Group>
          <h5>Puntuacion</h5>
          <StarRating
            count={5}
            value={rating}
            newRating={newRating}
            edit={true}
          />

          <hr />

          <Button variant="color5" type="submit">
            Enviar
          </Button>
        </Form>
      ) : (
        ""
      )}

      <br></br>
      {/* //reviews ya dejadas */}

      {reviews.map((review, i) => {
        return (
          <Card key={i}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>{review.user.name}</strong>
              </ListGroup.Item>
              <ListGroup.Item>{review.comment}</ListGroup.Item>

              <ListGroup.Item>
                Puntuacion: {estrellas(review.rate)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
    </>
  );
};

export default Review;
