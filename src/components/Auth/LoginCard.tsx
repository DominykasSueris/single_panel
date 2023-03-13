import Input from "components/Input/Input";
import Label from "components/Input/Label";
import Span from "components/Input/Span";
import Select, { Option } from "components/Input/Select";
import { AuthRegion, AuthTarget } from "redux/specs/authSpecs";
import { WLDevProfiles } from "./Login";

interface LoginCardProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  profile: WLDevProfiles;
  setProfile: (ev: WLDevProfiles) => void;
  authTarget: AuthTarget;
  setAuthTarget: (ev: AuthTarget) => void;
  setAuthRegion: (ev: AuthRegion) => void;
  setKey: (ev: string) => void;
  setSecret: (ev: string) => void;
}

const LoginCard = ({
  handleSubmit,
  profile,
  setProfile,
  authTarget,
  setAuthTarget,
  setAuthRegion,
  setKey,
  setSecret
}: LoginCardProps) => {
  const convertEnumToOptions = (e: typeof AuthRegion | typeof AuthTarget): Option[] => {
    const values = Object.values(e);
    const keys = Object.keys(e);
    return keys.map((key, i) => {
      return { key: values[i], value: key };
    });
  };

  const awsInput = () => {
    {
      if (WLDevProfiles.Programmatic === profile)
        return (
          <>
            <div className="row align-items-center pt-3">
              <Label htmlFor="aws-key" text="Key" />
              <Input
                type="text"
                id="aws-key"
                onChange={ev => setKey(ev.target.value)}
                disabled={authTarget != AuthTarget.AWS}
              />
              <Span id="aws-key-helper" text="AWS Key Id" />
            </div>
            <div className="row align-items-center pt-3">
              <Label htmlFor="aws-key-secret" text="Secret" />
              <Input
                type="password"
                onChange={ev => setSecret(ev.target.value)}
                id="aws-key-secret"
                disabled={authTarget != AuthTarget.AWS}
              />
              <Span id="aws-secret-helper" text="AWS Key Secret" />
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <div className="row pt-5">
        <div className="col-sm-12 col-md-6 offset-md-3">
          <form action="" className="card" onSubmit={handleSubmit}>
            <div className="card-header">
              <p className="mb-0">Cloud Authentication</p>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <Label htmlFor="aws-profile" text="Provider" />
                <div className="col-sm-12 col-md-3">
                  <Select
                    defaultValue={AuthTarget.AWS}
                    onChange={ev =>
                      setAuthTarget(
                        AuthTarget[ev.target.value.toLowerCase() as keyof typeof AuthTarget]
                      )
                    }
                    name="authTarget"
                    id="authTarget"
                    options={convertEnumToOptions(AuthTarget)}
                    disabled={authTarget != AuthTarget.AWS}
                  />
                </div>
                <div className="col-sm-12 col-md-6">
                  <Select
                    defaultValue={WLDevProfiles.Programmatic}
                    onChange={ev =>
                      setProfile(WLDevProfiles[ev.target.value as keyof typeof WLDevProfiles])
                    }
                    name="authType"
                    id="aws-profile"
                    disabled={authTarget != AuthTarget.AWS}
                    options={[
                      { key: WLDevProfiles.Programmatic, value: WLDevProfiles.Programmatic }
                    ]}
                  />
                </div>
              </div>
              <div className="row align-items-center pt-3">
                <Label htmlFor="aws-region" text="Region" />
                <div className="col-sm-12 col-md-6">
                  <Select
                    defaultValue={AuthRegion.EU_West_1}
                    onChange={ev =>
                      setAuthRegion(AuthRegion[ev.target.value as keyof typeof AuthRegion])
                    }
                    name="authRegion"
                    id="authRegion"
                    aria-label="Default select example"
                    disabled={authTarget != AuthTarget.AWS}
                    options={convertEnumToOptions(AuthRegion)}
                  />
                </div>
                <Span id="aws-region" text="Aws Region" />
              </div>
              {awsInput()}
              <div className="row">
                <div className="col-sm-12 col-md-8 text-right pt-3">
                  <button className="btn btn-primary" disabled={authTarget != AuthTarget.AWS}>
                    {profile === WLDevProfiles.Programmatic ? "Authenticate" : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
