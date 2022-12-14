import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProgressBar from "../commons/ProgressBar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../state/actions/orderActions";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.order);
  const [payments, setPayments] = useState([]);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/paymentMethods")
      .then((res) => res.data)
      .then((payments) => setPayments(payments));
  }, []);

  useEffect(() => {
    if (paymentMethod) {
      setPaymentMethodSelected(paymentMethod);
    }
  }, [paymentMethod]);

  const handleChange = (e) => {
    setPaymentMethodSelected(e.target.id);
    dispatch(savePaymentMethod(e.target.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodSelected));
    navigate("/placeOrder");
  };

  return (
    <section>
      <div className="jumbotron p-1 bg-color3 rounded">
        <h5 className="mt-2">
          <ProgressBar step1 step2 />
        </h5>
      </div>
      <div className="container border-0 mt-3 py-3">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <h6 className="fw-bold mb-4">Pago</h6>
            <form onSubmit={handleSubmit}>
              {payments
                ? payments.map((payment, i) => (
                    <div className="form-check mb-3" key={i}>
                      <input
                        id={i + 1}
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value={payment.name}
                        onChange={handleChange}
                        checked={paymentMethodSelected === payment.name}
                      />
                      <label className="form-check-label">
                        <div className="row">
                          {/* <div className="col-8 text-center">
                            <img
                              src={payment.logo}
                              alt="logo"
                              height="30"
                              width="auto"
                            ></img>
                          </div> */}

                          <div className="col">{payment.name}</div>
                        </div>
                      </label>
                    </div>
                  ))
                : ""}
              <Button type="submit" className="btn-color5 mt-1">
                Continuar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
