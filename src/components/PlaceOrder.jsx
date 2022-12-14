import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import ProgressBar from "../commons/ProgressBar";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearCart } from "../state/actions/cartActions";
import { clearOrder } from "../state/actions/orderActions";

const PlaceOrder = () => {
  const user = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { paymentMethod, shippingAdress } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (cart) {
      let bookOrdersData = [];
      cart.forEach((product) => {
        let book = {};
        book.quantity = product.quantity;
        book.bookId = product.id;
        bookOrdersData.push(book);
      });
      axios
        .post("http://localhost:3001/api/orderCreator", {
          userData: [{ id: user.id }],
          orderData: [{ paymentMethodId: paymentMethod }],
          bookOrdersData,
        })
        .then(() => {
          dispatch(clearOrder());
          dispatch(clearCart());
          alert("Gracias por elegirnos");
          navigate("/");
        });
    }
  };

  useEffect(() => {}, [user, paymentMethod, cart]);

  return (
    <section>
      <div className="jumbotron p-1 bg-color3 rounded">
        <h5 className="mt-2">
          <ProgressBar step1 step2 step3 />
        </h5>
      </div>
      <div className="container border-0 mt-3 py-3">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <h6 className="fw-bold mb-4">Confirmar compra</h6>
          </div>
        </div>
        <Button onClick={handleConfirm} className="btn-color5 mt-1 ms-5">
          Continuar
        </Button>
      </div>
    </section>
  );
};

export default PlaceOrder;
