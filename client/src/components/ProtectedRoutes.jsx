


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return children;
};
