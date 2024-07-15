import { Navigate } from "react-router-dom";

function index() {
  return <Navigate to={"/table/basic"} />;
}

export default index;
