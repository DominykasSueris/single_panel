import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import * as uuid from "uuid";

/** Redux */
import { cloudConnect } from "redux/reducers/auth";
import { AuthTarget, IProfile, AuthRegion } from "redux/specs/authSpecs";
import { Connect } from "redux/actions/authActions";

/** Cloud Services */
import { configClient } from "services/aws/aws";
import { CloudWatch } from "services/aws/aws";

/**Components */
import LoginCard from "./LoginCard";

/** Services */
import { AuthSessions } from "services/AuthSessions";

export enum WLDevProfiles {
  Dev = "dev",
  Programmatic = "programmatic",
  Creds = "creds"
}

interface LoginProps {
  isAuth?: boolean;
}

const Login = ({ isAuth }: LoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(WLDevProfiles.Programmatic);
  const [authTarget, setAuthTarget] = useState<AuthTarget>(AuthTarget.AWS);
  const [authRegion, setAuthRegion] = useState<AuthRegion>(AuthRegion.EU_West_1);
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isConnected = false;

    const loginData: IProfile = {
      id: uuid.v4(),
      type: profile,
      provider: authTarget,
      region: authRegion
    };

    if (profile === WLDevProfiles.Programmatic) {
      loginData.key = key;
      loginData.secret = secret;
      loginData.region = authRegion;
      isConnected = await configClient(key, secret, authRegion);
    }

    if (!isConnected) {
      alert("connection failed");
      return;
    }

    const watchers = CloudWatch.listWatchers();
    const tag = watchers[watchers.length - 1];
    loginData.tag = tag;

    AuthSessions.updateMethods(loginData);
    const payload = Connect(loginData.provider, loginData);
    const action = cloudConnect(payload);
    dispatch(action);

    navigate(`/${authTarget}`);
  };

  return isAuth ? (
    <Outlet></Outlet>
  ) : (
    <LoginCard
      profile={profile}
      handleSubmit={handleSubmit}
      authTarget={authTarget}
      setAuthTarget={setAuthTarget}
      setAuthRegion={setAuthRegion}
      setProfile={setProfile}
      setKey={setKey}
      setSecret={setSecret}
    />
  );
};

export default Login;
