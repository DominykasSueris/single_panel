import { useNavigate } from "react-router";
import LoginForm, { LoginData } from "components/Auth/LoginForm";
import { configClient } from "services/aws/aws";
import { CloudWatch } from "services/aws/aws";
import { useContext } from "react";
import { AuthContext } from "components/Providers/AWS/AwsAuth";

export enum WLDevProfiles {
  DEV = "Dev",
  PROGRAMMATIC = "Programmatic",
  CREDS = "Creds"
}

export interface Session extends LoginData {
  tag: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { addSession } = useContext(AuthContext);

  const handleLogin = async (loginData: LoginData) => {
    const isConnected = await configClient(loginData.key, loginData.secret, loginData.authRegion);

    if (!isConnected) {
      alert("Connection failed");
      return;
    }

    const watchers = CloudWatch.listWatchers();
    const tag = watchers[watchers.length - 1];
    console.log(tag);

    const session: Session = {
      ...loginData,
      tag: tag
    };

    addSession(session);

    navigate(`/${loginData.authTarget}`);
  };

  return <LoginForm handleSubmit={handleLogin} />;
};

export default Login;
