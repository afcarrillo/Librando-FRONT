import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../constants/cartConstants";

export const addToCart = (book) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  let duplicates = cart.filter((cartItem) => cartItem.id === book.id);
  if (duplicates.length === 0) {
    const bookToAdd = {
      ...book,
      quantity: 1,
    };
    cart.push(bookToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  }
};

export const removeFromCart = (book) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const updatedCart = cart.filter((cartItem) => cartItem.id !== book.id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  dispatch({
    type: REMOVE_FROM_CART,
    payload: updatedCart,
  });
};

export const clearCart = () => async (dispatch) => {
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  cart = [];
  localStorage.clear("cart");
  dispatch({
    type: CLEAR_CART,
    payload: cart,
  });
};
