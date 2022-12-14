import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardBook = ({ book }) => {
  return (
    <Card style={{height:"550px"}} className="mb-4">
      <Container fluid >
        <Link to={`/book/${book.id}`}>
          <Card.Img
            variant="top"
            src={book.front}
            style={{ height: "320px" }}
            className="mt-2"
          />
        </Link>

        <Row style={{height:"170px"}}>
          <Card.Body>
            <Row>
              <Card.Title>{book.title}</Card.Title>
            </Row>
            <Row>
              <Card.Text>
                {book.description.slice(0, 85).concat("...")}
              </Card.Text>
            </Row>
          </Card.Body>
        </Row>
        <Row className="d-flex align-items-end">
          <Link to={`/book/${book.id}`}>
            <Button variant="color5" >Ver más</Button>
          </Link>
        </Row>
      </Container>
    </Card>
  );
};

export default CardBook;
