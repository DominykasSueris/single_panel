import Input from "components/Input/Input";
import Label from "components/Input/Label";
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
                <Label htmlFor="aws-profile" className="col-form-label" text="Provider" />
                <div className="col-sm-12 col-md-3">
                  <select
                    defaultValue={AuthTarget.AWS}
                    onChange={ev =>
                      setAuthTarget(
                        AuthTarget[ev.target.value.toLowerCase() as keyof typeof AuthTarget]
                      )
                    }
                    name="authTarget"
                    required
                    className="form-select"
                    id="authTarget"
                    aria-label="Default select example"
                  >
                    {Object.keys(AuthTarget).map(key => (
                      <option value={key.toLowerCase()} key={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-12 col-md-6">
                  <select
                    defaultValue={WLDevProfiles.Programmatic}
                    onChange={ev =>
                      setProfile(WLDevProfiles[ev.target.value as keyof typeof WLDevProfiles])
                    }
                    name="authType"
                    required
                    className="form-select"
                    id="aws-profile"
                    aria-label="Default select example"
                    disabled={authTarget != AuthTarget.AWS}
                  >
                    <option value={WLDevProfiles.Programmatic} key={WLDevProfiles.Programmatic}>
                      Programmatic Access
                    </option>
                  </select>
                </div>
                <div className="col-sm-12 col-md-4">
                  <span id="aws-profile-helper" className="form-text">
                    {profile === WLDevProfiles.Programmatic
                      ? ""
                      : profile === WLDevProfiles.Dev
                      ? "Watchland test profile"
                      : "AWS Profile"}
                  </span>
                </div>
              </div>
              <div className="row align-items-center pt-3">
                <Label htmlFor="aws-region" className="col-form-label" text="Region" />
                <div className="col-sm-12 col-md-6">
                  <select
                    defaultValue={AuthRegion.EU_West_1}
                    onChange={ev =>
                      setAuthRegion(AuthRegion[ev.target.value as keyof typeof AuthRegion])
                    }
                    name="authRegion"
                    required
                    className="form-select"
                    id="authRegion"
                    aria-label="Default select example"
                    disabled={authTarget != AuthTarget.AWS}
                  >
                    {Object.values(AuthRegion).map(key => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-12 col-md-4">
                  <span id="aws-region" className="form-text">
                    AWS Region
                  </span>
                </div>
              </div>
              {profile === WLDevProfiles.Programmatic ? (
                <>
                  <div className="row align-items-center pt-3">
                    <Label htmlFor="aws-key" className="col-form-label" text="Key" />
                    <Input
                      type="text"
                      id="aws-key"
                      onChange={ev => setKey(ev.target.value)}
                      className="form-control"
                      required
                      autoComplete={"on"}
                      disabled={authTarget != AuthTarget.AWS}
                    />
                    <div className="col-sm-12 col-md-4">
                      <span id="aws-key-helper" className="form-text">
                        AWS Key Id
                      </span>
                    </div>
                    <div className="row align-items-center pt-3">
                      <Label htmlFor="aws-key-secret" className="col-form-label" text="Secret" />
                      <div className="col-sm-12 col-md-6">
                        <input
                          type="password"
                          onChange={ev => setSecret(ev.target.value)}
                          id="aws-key-secret"
                          required
                          className="form-control"
                          autoComplete={"on"}
                          disabled={authTarget != AuthTarget.AWS}
                        />
                      </div>
                      <div className="col-sm-12 col-md-4">
                        <span id="aws-secret-helper" className="form-text">
                          AWS Key Secret
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
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
