import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

// al trabajar con axios (async) en redux necesitamos acciones de tipo createAsyncThunk
export const sendLoginRequest = createAsyncThunk(
  "USER_LOGIN",
  ({ email, password }) => {
    return axios
      .post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then((user) => {
        // persistencia en localStorage
        //setUserLocalStorage(user);
        // guardamos en el estado user {id, name, lastname, email, isAdmin }
        return user;
      })

      .catch((error) => {
        const message = error.response.data;
        message.includes("Usuario")
          ? alert("El usuario no existe")
          : alert("Contraseña incorrecta");
      });
  }
);

export const sendLogoutRequest = createAsyncThunk("USER_LOGOUT", () => {
  return axios
    .get("http://localhost:3001/api/users/logout", { withCredentials: true })
    .then(() => {
      // vaciamos localStorage
      //clearLocalStorage();
      // guardamos en el estado el estado inicial {}
      return initialState;
    })
    .catch((error) => {
      alert("Error: No se pudo desloguear");
    });
});

// Persistencia local storage
/* export const getUserCookie = createAction("GET_USER_COOKIE");

function setUserLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getUserLocalStorage() {
  return JSON.parse(localStorage.getItem("user")) || initialState;
}

function clearLocalStorage() {
  localStorage.clear();
} */

// Persistencia cookie
export const getUserCookie = createAsyncThunk("GET_USER_COOKIE", () => {
  return axios
    .get("http://localhost:3001/api/users/me", { withCredentials: true })
    .then((res) => res.data)
    .then((user) => user)
    .catch((error) => {
      console.log(`GET COOKIES`, error);
    });
});

const userReducer = createReducer(initialState, {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
  [getUserCookie.fulfilled]: (state, action) => action.payload,
  //[getUserCookie]: (state, action) => getUserLocalStorage(),
});

export default userReducer;
