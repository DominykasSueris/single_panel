import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

/** Redux */
import { AuthTarget } from "redux/specs/authSpecs";

/** Cloud Services */
import { configClient } from "services/aws/aws";

/** Components  */
import Login, { LoginConfig } from "components/Auth/Login";

/** Services */
import { AuthSessions } from "services/AuthSessions";

const AwsAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const syncClients = async () => {
    const methods = AuthSessions.getMethods();
    for (const method of methods) {
      await configClient(method.key, method.secret, method.region);
    }
  };

  useEffect(() => {
    syncClients();
  }, []);

  useEffect(() => {
    const methods = AuthSessions.getMethods();
    if (methods.filter((method: LoginConfig) => method.target === AuthTarget.aws).length > 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return isAuth ? <Outlet></Outlet> : <Login isAuth={isAuth} />;
};

export default AwsAuth;
