import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import ListOrders from "../commons/ListOrders";

const AdminOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    user && user.isAdmin
      ? axios
          .get("http://localhost:3001/api/order", { withCredentials: true })
          .then((res) => res.data)
          .then((orders) => setOrders(orders))
      : navigate("/");
  }, [user, navigate]);

  return <ListOrders orders={orders} />;
};

export default AdminOrders;
