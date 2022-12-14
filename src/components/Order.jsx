import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import useInput from "../hooks/useInput";
import { Button, Form, Table } from "react-bootstrap";

const Order = ({ user }) => {
  const order = useLocation().state;
  const status = useInput();
  const navigate = useNavigate();

  const changeStatus = () => {
    const statusId = parseInt(status.value);

    statusId
      ? axios
          .put(
            `http://localhost:3001/api/order/change/${order.id}`,
            {
              statusId,
            },
            { withCredentials: true }
          )
          .then((res) => res.data)
          .then(navigate("/admin/orders"))
      : alert("Seleeciona una opción valida");
  };

  return (
    <>
      <h5>
        <strong>Detalle de orden</strong>
      </h5>
      {order ? (
        <>
          <ul style={{ listStyleType: "none" }}>
            <h6>
              <strong>Usuario:</strong>
            </h6>
            <li className="ps-3">
              Nombre: {order.user.name} {order.user.lastname}
            </li>
            <li className="ps-3">Email: {order.user.email}</li>
            <li className="ps-3">DNI: {order.user.dni}</li>
            <li className="ps-3">
              Dirección: {order.user.address.split(",").join(" ")}
            </li>
          </ul>
          <ul style={{ listStyleType: "none" }}>
            <h6>
              <strong>Pedido:</strong>
            </h6>
            <li className="ps-3">
              Fecha: {new Date(order.createdAt).toDateString()}
            </li>
            <li className="ps-3">
              Pago: {order.payment ? order.payment.name : ""}
            </li>
            <li className="ps-3">Total: ${order.total}</li>
            <li className="ps-3">Estado: {order.status.name}</li>
            {user.isAdmin ? (
              <>
                <li>
                  Modificar estado:
                  <Form.Select size="sm" {...status}>
                    <option value="0">Seleccione una opción:</option>
                    <option value="1">Confirmada</option>
                    <option value="2">Pendiente</option>
                    <option value="3">Rechazada</option>
                  </Form.Select>
                  <Button size="sm" className="mt-2" onClick={changeStatus}>
                    Aceptar
                  </Button>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <div className="table-responsive">
            <Table striped hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Libro</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {order.book_orders.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Link
                        to={`/book/${product.bookId}`}
                        className="text-color6">
                        <img
                          src={product.book.front}
                          alt="Portada"
                          width="100px"
                          height="auto"
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/book/${product.bookId}`}
                        className="text-color6">
                        <strong>{product.book.title}</strong>
                      </Link>
                      <br />
                      <small>
                        {product.book.description.slice(0, 200).concat("...")}
                      </small>
                    </td>
                    <td className="text-center text-center">
                      <br />
                      <br />${product.total.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <br />
                      <br />
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Order;
