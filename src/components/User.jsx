import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

import ListOrders from "../commons/ListOrders";

const User = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (userId);
    axios
      .get(`http://localhost:3001/api/users/get/${userId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((user) => setUser(user))
      .then(
        axios
          .get(`http://localhost:3001/api/order/userOrders/${userId}`)
          .then((res) => res.data)
          .then((orders) => setOrders(orders))
      );
  }, [userId]);

  return userId ? (
    <>
      <h5>
        <strong>Perfil de usuario</strong>
      </h5>
      <h6>
        <strong>Nombre</strong>: {user.name}
      </h6>
      <h6>
        <strong>Apellido</strong>: {user.lastname}
      </h6>
      <h6>
        <strong>DNI</strong>: {user.dni}
      </h6>
      <h6>
        <strong>Email</strong>: {user.email}
      </h6>
      <h6>
        <strong>Address</strong>:{" "}
        {user.address ? user.address.split(",").join(" ") : ""}
      </h6>
      <ListOrders orders={orders} />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default User;
