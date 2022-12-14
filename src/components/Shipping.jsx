import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ProgressBar from "../commons/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../state/actions/orderActions";
import { useNavigate } from "react-router";
import axios from "axios";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [street, setStreet] = useState("");
  const [num, setNum] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingData = {
      street,
      num,
      apartment,
      city,
      province,
      zip,
    };
    dispatch(saveShippingAddress(shippingData));
    navigate("/payment");
  };

  useEffect(() => {
    if (user)
      axios
        .get(`http://localhost:3001/api/users/get/${user.id}`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((user) => {
          setAddress(user.address.split(","));
          setStreet(address[0]);
          setNum(address[1]);
          setApartment(address[2]);
          setCity(address[3]);
          setProvince(address[4]);
          setZip(address[5]);
        });

    if (!address) {
      shippingAddress.street
        ? setStreet(shippingAddress.street)
        : setStreet("");
      shippingAddress.num ? setNum(shippingAddress.num) : setNum("");
      shippingAddress.apartment
        ? setApartment(shippingAddress.apartment)
        : setApartment("");
      shippingAddress.city ? setCity(shippingAddress.city) : setCity("");
      shippingAddress.province
        ? setProvince(shippingAddress.province)
        : setProvince("");
      shippingAddress.zip ? setZip(shippingAddress.zip) : setZip("");
    }
  }, [shippingAddress, user, address]);

  return (
    <section >
      <div className="jumbotron p-1 bg-color3 rounded">
        <h5 className="mt-2">
          <ProgressBar step1 />
        </h5>
      </div>
      <div className="container border-0 mt-3 py-3">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <h6 className="fw-bold mb-4">Detalles de envío</h6>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom04">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Calle"
                    required
                    className="mb-2"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce una calle.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom05">
                  <Form.Label>Num.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Num."
                    required
                    className="mb-2"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce un numero.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom06">
                  <Form.Label>Dpto.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dpto."
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom07">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ciudad"
                    required
                    className="mb-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce una ciudad.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom08">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Provincia"
                    required
                    className="mb-2"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce una provincia.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom09">
                  <Form.Label>CPA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CPA"
                    required
                    className="mb-2"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce un codigo postal.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit" className="btn-color5 mt-1">
                Continuar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
