import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

/** Redux */
import { AuthTarget, AuthRegion } from "redux/specs/authSpecs";

/** Cloud Services */
import { configClient } from "services/aws/aws";
import { CloudWatch } from "services/aws/aws";

/** Services */
import { AuthSessions } from "services/AuthSessions";
import LoginForm, { LoginData } from "./LoginForm";

export enum WLDevProfiles {
  DEV = "Dev",
  PROGRAMMATIC = "Programmatic",
  CREDS = "Creds"
}

interface LoginProps {
  isAuth?: boolean;
}

export interface LoginConfig {
  type: WLDevProfiles
  target: AuthTarget
  region: AuthRegion
  key: string
  secret: string
}

const Login = ({ isAuth }: LoginProps) => {
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginData) => {
    console.log("veik")
    console.log(loginData)
    // let isConnected = false;

    // if (loginConfig.type === WLDevProfiles.PROGRAMMATIC && loginConfig.key && loginConfig.secret) {
    //   isConnected = await configClient(loginConfig.key, loginConfig.secret, loginConfig.region);
    // }

    // if (!isConnected) {
    //   alert("connection failed");
    //   return;
    // }

    // const watchers = CloudWatch.listWatchers();
    // const tag = watchers[watchers.length - 1];
    // console.log(tag)
    // // loginData.tag = tag;

    // AuthSessions.updateMethods(loginConfig);

    // navigate(`/${loginConfig.target}`);
  };

  return isAuth ? (
    <Outlet></Outlet>
  ) : (
    <LoginForm handleSubmit={handleLogin}/>
  );
};

export default Login;
