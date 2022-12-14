import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../state/actions/cartActions";
import { ADD_TO_CART } from "../state/constants/cartConstants";

const CartCanvas = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleQtyChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cart.forEach((cartItem) => {
      if (cartItem.id === product.id) {
        cartItem.quantity = e.target.value;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  return (
    <Container fluid>
      <Row className="border-bottom border-color1">
        {cart.map((product, i) => (
          <Row key={i} className="mb-4">
            <Col
              md={4}
              className="d-flex align-items-center border-end border-color1"
            >
              <img src={product.front} alt="Portada" />
            </Col>
            <Col md={8}>
              <p className="text-wrap">
                <strong>Título:</strong> <small>{product.title}</small>
              </p>
              <p>
                <strong>Cantidad: </strong>
                <small>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={product.quantity}
                    onChange={(e) => handleQtyChange(e, product)}
                  />
                </small>
              </p>
              <p>
                <strong>Subtotal:</strong>{" "}
                <small>${(product.price * product.quantity).toFixed(2)}</small>
              </p>
              <Button
                size="sm"
                variant="color5"
                onClick={() => dispatch(removeFromCart(product))}
              >
                <i className="bi bi-trash3"></i>
              </Button>
            </Col>
          </Row>
        ))}
      </Row>
      <Row className="mt-4">
        {cart.length !== 0 ? (
          <Col>
            <strong>Total: </strong>$
            {cart
              .reduce(
                (currentSum, currentCartItem) =>
                  currentSum + currentCartItem.quantity * currentCartItem.price,
                0
              )
              .toFixed(2)}
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default CartCanvas;
