import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";


function AdminProtectedRoute() {
  const { users } = useAuth();

  // Not logged in
  if (!users) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in but NOT admin
  if (users.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin allowed
  return <Outlet />;
}

export default AdminProtectedRoute;
