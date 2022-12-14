import React from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ step1, step2, step3 }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {step1 ? (
            <li className="breadcrumb-item mt-2 active" aria-current="page">
              <Link
                to="/shipping"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none" }}
                className="text-color5 ps-2"
              >
                <i className="bi bi-mailbox"></i> Envío
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item mt-2" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted ps-2"
              >
                Envío
              </Link>
            </li>
          )}

          {step2 ? (
            <li className="breadcrumb-item mt-2 active" aria-current="page">
              <Link
                to="/payment"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none" }}
                className="text-color5 ps-2"
              >
                <i className="bi bi-currency-dollar"></i> Pago
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item mt-2" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted ps-2"
              >
                Pago
              </Link>
            </li>
          )}

          {step3 ? (
            <li className="breadcrumb-item mt-2 active" aria-current="page">
              <Link
                to="/placeOrder"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none" }}
                className="text-color5 ps-2"
              >
                <i className="bi bi-send"></i> Enviar orden
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item mt-2" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted ps-2"
              >
                Enviar Orden
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export default ProgressBar;
