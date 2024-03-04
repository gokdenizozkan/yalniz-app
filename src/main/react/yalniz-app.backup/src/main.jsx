import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page.jsx";
import Dashboard from "./routes/dashboard.jsx";
import {Container} from "@mui/material";

const router = createBrowserRouter([{
  path: "/",
  element: <Dashboard/>,
  errorElement: <ErrorPage/>,
},]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <RouterProvider router={router}/>
    </Container>
  </React.StrictMode>);