import React from "react";
//import Users from "./components/Users";
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const routes = {
  "/register": () => <Register />,
  "/login": () => <Login />,
}
export default routes;