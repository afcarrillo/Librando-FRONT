import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TO_CART } from "../state/constants/cartConstants";
import { removeFromCart } from "../state/actions/cartActions";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

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

  const handleCheckout = () => {
    if (user && user.id) {
      navigate("/shipping");
    } else {
      navigate("/login", { state: "/cart" });
    }
  };

  return (
    <section className="cart-page">
      <h1 className="mb-3 pt-1">Carrito</h1>
      <Container>
        <Row>
          <Col md={8}>
            <Table striped hover size="sm" responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Libro</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, i) => (
                  <tr key={i}>
                    <td>
                      <Link to={`/book/${product.id}`} className="text-color6">
                        <img
                          className="img-fluid w-100 img-thumbnail"
                          src={product.front}
                          alt="Portada"
                          style={{ maxWidth: "500px" }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/book/${product.id}`} className="text-color6">
                        <strong>{product.title}</strong>
                      </Link>
                      <br />
                      <small>
                        {product.description.slice(0, 200).concat("...")}
                      </small>
                    </td>
                    <td className="text-center text-center">
                      <br />
                      <br />${product.price.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <br />
                      <br />
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={product.quantity}
                        onChange={(e) => handleQtyChange(e, product)}
                      />
                    </td>
                    <td className="text-center">
                      <br />
                      <br />
                      <Button
                        size="sm"
                        variant="color5"
                        onClick={() => dispatch(removeFromCart(product))}
                      >
                        <i className="bi bi-trash3"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={4} className="ps-4 border-start border-color2">
            <h2>Resumen de la compra</h2>
            <p className="text-muted border-bottom">
              <small>
                {cart.length === 1
                  ? "(1) Artículo"
                  : `(${cart.length}) Artículos`}
              </small>
            </p>
            <p className="fw-bold">
              Total: $
              {cart
                .reduce(
                  (currentSum, currentCartItem) =>
                    currentSum +
                    currentCartItem.quantity * currentCartItem.price,
                  0
                )
                .toFixed(2)}
            </p>
            <div className="d-grid gap-2">
              <button className="btn btn-color5" onClick={handleCheckout}>
                Ir a pagar
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
