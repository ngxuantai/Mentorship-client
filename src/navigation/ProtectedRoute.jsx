import { useUserStore } from "../store/userStore";

const ProtectedRoute = ({ children }) => {
  const { user: s } = useUserStore();
  console.log("protectedroute", s);
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
