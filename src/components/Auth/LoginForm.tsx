import { ChangeEvent, useState, FormEvent } from "react";

/**Components */
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

/**Specs */
import { AuthTarget, AuthRegion } from "redux/specs/authSpecs";
import { WLDevProfiles } from "components/Auth/Login";

export interface LoginData {
  authTarget: keyof typeof AuthTarget;
  authProfile: keyof typeof WLDevProfiles;
  authRegion: keyof typeof AuthRegion;
  key: string;
  secret: string;
}

const LoginForm = ({
  handleSubmit: loginHandler
}: {
  handleSubmit: (loginData: LoginData) => void;
}) => {
  const [loginData, setLoginData] = useState<LoginData>({
    authTarget: "aws",
    authProfile: "PROGRAMMATIC",
    authRegion: "eu-west-1",
    key: "",
    secret: ""
  });

  const convertEnumToOptions = (
    e: typeof AuthRegion | typeof AuthTarget | typeof WLDevProfiles
  ): { label: string; value: string }[] => {
    const values = Object.values(e);
    const keys = Object.keys(e);
    return keys.map((key, i) => {
      return { label: values[i], value: key };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginHandler(loginData);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <p className="mb-0">Cloud Authentication</p>
      </div>
      <div className="card-body">
        <FormSelect
          id="authTarget"
          label="Provider"
          options={convertEnumToOptions(AuthTarget)}
          value={loginData.authTarget}
          onChange={handleChange}
          disabled
        />
        <FormSelect
          id="authProfile"
          label="Profile"
          options={convertEnumToOptions(WLDevProfiles)}
          value={loginData.authProfile}
          onChange={handleChange}
          disabled
        />
        <FormSelect
          id="authRegion"
          label="Region"
          options={convertEnumToOptions(AuthRegion)}
          value={loginData.authRegion}
          onChange={handleChange}
        />

        <FormInput
          id="key"
          label="Key"
          value={loginData.key}
          placeholder="YourKey"
          onChange={handleChange}
        />
        <FormInput
          id="secret"
          label="Secret"
          type="password"
          placeholder="VerySecurePassword"
          value={loginData.secret}
          onChange={handleChange}
        />
        <div className="row">
          <div className="col-sm-12 col-md-8 text-right pt-3">
            <button className="btn btn-primary">
              {loginData.authProfile === "PROGRAMMATIC" ? "Authenticate" : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
