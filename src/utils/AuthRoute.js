import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const navigate = useNavigate();
  const isAuth =
    localStorage.getItem("isAuth") &&
    localStorage.getItem("isAuth") !== "false";

  return isAuth ? <Outlet /> : navigate(-1);
};

export default AuthRoute;
