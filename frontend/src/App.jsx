import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthProvider";
import AdminLogin from "./Admin/pages/Login.jsx";
import Dashboard from "./Admin/pages/Dashboard.jsx";
import AdminProducts from "./Admin/pages/AdminProduct.jsx"
import AddProducts from "./Admin/pages/AddProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path:"admin/login",
        element:<AdminLogin />
      },
      {
        path:"admin/dashboard",
        element:<Dashboard />
      },
      {
        path:"admin/products",
        element:<AdminProducts />
      },
      {
        path:"/admin/add-products",
        element:<AddProducts />
      },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
