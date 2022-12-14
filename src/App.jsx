import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import Grid from "./commons/Grid";
import Home from "./components/Home";
import Content from "./components/Content.jsx";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import User from "./components/User";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import PlaceOrder from "./components/PlaceOrder";
import Order from "./components/Order";
import AdminPanel from "./components/AdminPanel";
import AdminUsers from "./components/AdminUsers";
import AdminBooks from "./components/AdminBooks";
import AdminGenres from "./components/AdminGenres";
import AdminOrders from "./components/AdminOrders";
import EditGenre from "./commons/EditGenre";
import { Container, Row, Col } from "react-bootstrap";
import { getUserCookie } from "./state/user";
import EditBook from "./commons/EditBook";
import EditUser from "./commons/EditUser";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCookie());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <div className="app">
      <Navbar user={user} />
      <Row className="justify-content-md-center min-height-view-port">
        {user.isAdmin ? (
          <Col
            md={3}
            className="bg-color5 text-white justify-content-md-center p-3"
          >
            <AdminPanel />
          </Col>
        ) : (
          ""
        )}
        <Col md={user.isAdmin ? 9 : 12}>
          <Container fluid="md my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user" element={<User userId={user.id} />} />
              <Route path="/user/order/:id" element={<Order user={user} />} />
              <Route path="/book/:id" element={<Content />} />
              <Route path="/books/:type" element={<Grid />} />
              <Route path="/search/:query" element={<Grid />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeOrder" element={<PlaceOrder />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/books" element={<AdminBooks />} />
              <Route path="/admin/books/edit/:id" element={<EditBook />} />
              <Route path="/admin/books/create" element={<EditBook />} />
              <Route
                path="/admin/genres"
                element={<AdminGenres user={user} />}
              />
              <Route path="/admin/genres/edit/:id" element={<EditGenre />} />
              <Route
                path="/admin/orders"
                element={<AdminOrders user={user} />}
              />
              <Route
                path="/admin/orders/edit/:id"
                element={<Order user={user} />}
              />
              <Route path="/admin/users/createuser" element={<Signup />} />
              <Route path="/admin/users/edit/:id" element={<EditUser />} />
            </Routes>
          </Container>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default App;
