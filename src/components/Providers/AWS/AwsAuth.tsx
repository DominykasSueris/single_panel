import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

/** Cloud Services */
import { configClient } from "services/aws/aws";

/** Components  */
import Login from "components/Auth/Login";

/** Services */
import { AuthSessions } from "services/AuthSessions";
import { LoginData } from "components/Auth/LoginForm";

const AwsAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const syncClients = async () => {
    const methods = AuthSessions.getMethods();
    for (const method of methods) {
      await configClient(method.key, method.secret, method.authTarget);
    }
  };

  useEffect(() => {
    syncClients();
  }, []);

  useEffect(() => {
    const methods = AuthSessions.getMethods();
    if (methods.filter((method: LoginData) => method.authTarget === "aws").length > 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return isAuth ? <Outlet></Outlet> : <Login isAuth={isAuth} />;
};

export default AwsAuth;
