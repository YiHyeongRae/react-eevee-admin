import { Navigate } from "react-router-dom";

function index() {
  return <Navigate to={"/dashboard"} />;
}

export default index;
