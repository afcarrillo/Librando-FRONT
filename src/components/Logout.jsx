import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { sendLogoutRequest } from "../state/user";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendLogoutRequest());
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
