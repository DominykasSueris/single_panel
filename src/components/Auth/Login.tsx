import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

/**Components */
import LoginForm, { LoginData } from "components/Auth/LoginForm";

/** Cloud Services */
import { configClient } from "services/aws/aws";
import { CloudWatch } from "services/aws/aws";

/** Services */
import { AuthSessions } from "services/AuthSessions";

export enum WLDevProfiles {
  DEV = "Dev",
  PROGRAMMATIC = "Programmatic",
  CREDS = "Creds"
}

interface LoginProps {
  isAuth?: boolean;
}

export interface Session extends LoginData {
  tag: string;
}

const Login = ({ isAuth }: LoginProps) => {
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginData) => {
    const isConnected = await configClient(loginData.key, loginData.secret, loginData.authRegion);

    if (!isConnected) {
      alert("connection failed");
      return;
    }

    const watchers = CloudWatch.listWatchers();
    const tag = watchers[watchers.length - 1];
    console.log(tag);

    const session: Session = {
      ...loginData,
      tag: tag
    };

    AuthSessions.updateMethods(session);

    navigate(`/${loginData.authTarget}`);
  };

  return isAuth ? <Outlet></Outlet> : <LoginForm handleSubmit={handleLogin} />;
};

export default Login;
