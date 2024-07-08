import { Navigate } from "react-router-dom";
import { AuthGuardTypes } from "../../data/types/components";

const Authorization = ({
  isAuthenticated,
  redirectTo,
  children,
}: AuthGuardTypes) => {
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};
export default Authorization;
