import { Navigate } from "react-router-dom";
import firebaseInstance from "../services/firebase";
import { useUserStore } from "../store/userStore";

const ProtectedRoute = ({ children }) => {
  const { user: s } = useUserStore();
  const user = firebaseInstance.auth.currentUser;
  console.log("protectedroute", s, user);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
