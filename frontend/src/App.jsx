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
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import CreateCoupon from "./Admin/pages/CreateCoupon.jsx";
import CouponList from "./Admin/pages/CouponList.jsx"
import EditCoupon from "./Admin/pages/EditCoupon.jsx"
import UserList from "./Admin/pages/UserList.jsx";
import ProductProvider from "./contexts/ProductProvider.jsx";

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
        path: "/product/:slug",
        element: <SingleProduct />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "admin/login",
        element: <AdminLogin />
      },
      {
        path: "admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "admin/products",
        element: <AdminProducts />
      },
      {
        path: "/admin/add-products",
        element: <AddProducts />
      },
      {
        path: "/admin/createCoupon",
        element: <CreateCoupon />
      },
      {
        path: "/admin/couponList",
        element: <CouponList />
      },
      {
        path: "/admin/editCoupon/:id",
        element: <EditCoupon />
      },
      {
        path: "/admin/userList",
        element: <UserList />
      },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
















// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import First from "./pages/First";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AuthProvider from "./contexts/AuthProvider";
// import AdminLogin from "./Admin/pages/Login.jsx";
// import Dashboard from "./Admin/pages/Dashboard.jsx";
// import AdminProducts from "./Admin/pages/AdminProduct.jsx";
// import AddProducts from "./Admin/pages/AddProduct.jsx";
// import SingleProduct from "./pages/SingleProduct.jsx";
// import Cart from "./pages/Cart.jsx";
// import CartProvider from "./contexts/CartContext.jsx";
// import CreateCoupon from "./Admin/pages/CreateCoupon.jsx";
// import CouponList from "./Admin/pages/CouponList.jsx";
// import EditCoupon from "./Admin/pages/EditCoupon.jsx";
// import UserList from "./Admin/pages/UserList.jsx";

// import AdminProtectedRoute from "./Admin/Routes/AdminProtectedRoute.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <First />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "product/:slug", element: <SingleProduct /> },
//       { path: "cart", element: <Cart /> },

//       //  Admin login is PUBLIC
//       { path: "admin/login", element: <AdminLogin /> },

//       // ADMIN PROTECTED ROUTES
//       {
//         path: "admin",
//         element: <AdminProtectedRoute />,
//         children: [
//           { path: "dashboard", element: <Dashboard /> },
//           { path: "products", element: <AdminProducts /> },
//           { path: "add-products", element: <AddProducts /> },
//           { path: "createCoupon", element: <CreateCoupon /> },
//           { path: "couponList", element: <CouponList /> },
//           { path: "editCoupon/:id", element: <EditCoupon /> },
//           { path: "userList", element: <UserList /> },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <RouterProvider router={router} />
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
