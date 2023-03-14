import { Link } from "react-router-dom";

/** Services */
import { AuthSessions } from "services/AuthSessions";
import { LoginConfig } from "components/Auth/Login";

const AwsAccounts = () => {

  const loginMethods = AuthSessions.getMethods()

  const disconnect = (method: LoginConfig) => {
    const existingMethods = AuthSessions.getMethods();
    const remainingConnections = existingMethods.filter(
      existingMethod => existingMethod.key !== method.key
    );
    // if (method.tag) CloudWatch.removeWatcher(method.tag);
    AuthSessions.setMethods(remainingConnections);
  };

  return (
    <div className="container mt-3">
      <div className="mt-5 mb-5">
        <div className="mt-4 p-5 bg-info text-white rounded">
          <h1>Active AWS Accounts</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..
          </p>
        </div>
      </div>
      <div className="col-14 text-right mb-2">
        <Link className="btn btn-info mr-2" to="/login">
          Add Connection
        </Link>
        <Link className="btn btn-warning" to="groups">
          Log Groups
        </Link>
      </div>
      <ul className="list-group">
        {loginMethods.map((method: LoginConfig) =>
          <li className="list-group-item container" key={method.key}>
            <div className="row align-items-center">
              <div className="col-9">
                <p className="mb-0">
                  {/* {method.tag} - <strong>{method.type}</strong> */}
                  tagas?
                </p>
              </div>
              <div className="col-3 text-right">
                <button
                  onClick={() => disconnect(method)}
                  type="button"
                  className="btn btn-danger"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </li>
        )
        }
      </ul>
    </div>
  );
};

export default AwsAccounts;
