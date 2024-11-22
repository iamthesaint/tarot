// client/src/main.tsx
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TarotReading from "./pages/TarotReading";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Account from "./pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reading",
        element: <TarotReading />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
 /* <ApolloProvider client={client}> */
    <RouterProvider router={router} />
 /* </ApolloProvider>  */
);
