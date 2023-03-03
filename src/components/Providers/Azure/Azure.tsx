import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AuthTarget } from "../../../redux/specs/authSpecs";
import { RootState } from "../../../redux/store";
import ComingSoonAlert from "../../alerts/AlertComingSoon";

const Azure = () => {
  const isAuth = useSelector((state: RootState) => {
    return state.auth.current?.provider === AuthTarget.Azure;
  });

  return isAuth ? (
    <Outlet></Outlet>
  ) : (
    <div>
      <div className="mt-5 mb-5">
        <div className="mt-4 p-5 bg-info text-white rounded">
          <h1>Active Azure Accounts</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..
          </p>
        </div>
      </div>
      <ComingSoonAlert />
    </div>
  );
};

export default Azure;
