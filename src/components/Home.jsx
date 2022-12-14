import React from "react";
import home from "../assets/home.png";
import { Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row >
        <h1 className="display-3 text-center">¡Bienvenido!</h1>
      </Row>
      <img className="mt-2 text-center" height="700px" width="auto" src={home}></img>
    </>
  );
};

export default Home;
