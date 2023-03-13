import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

/** Redux */
import { RootState } from "redux/store";
import { AuthTarget, IProfile } from "redux/specs/authSpecs";

/** Cloud Services */
import { configClient } from "services/aws/aws";

/** Components  */
import Login from "components/Auth/Login";

/** Services */
import { AuthSessions } from "services/AuthSessions";

const AwsAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const auth = useSelector((state: RootState) => {
    const auths = state.auth.methods?.filter(
      (method: IProfile) => method.provider === AuthTarget.AWS
    );
    return auths.length > 0;
  });

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
    if (auth) return setIsAuth(true);

    const methods = AuthSessions.getMethods();
    if (methods.filter((method: IProfile) => method.provider === AuthTarget.AWS).length > 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [auth]);

  return isAuth ? <Outlet></Outlet> : <Login isAuth={isAuth} />;
};

export default AwsAuth;
