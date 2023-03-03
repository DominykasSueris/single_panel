import { Route, Routes } from "react-router-dom";
import "./WatchLand.scss";

/**Components */
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import AwsAuth from "./components/Providers/AWS/AwsAuth";
import AwsAccounts from "./components/Providers/AWS/AwsAccounts";
import AwsStreamsPage from "./components/pages/aws/AwsStreamsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import Azure from "./components/Providers/Azure/Azure";
import GoogleCloud from "./components/Providers/gCloud/GoogleCloud";
import AwsGroupsPage from "./components/pages/aws/AwsGroupsPage";
import AwsLogsPage from "./components/pages/aws/AwsLogsPage";

const WatchLand = () => {
  return (
    <div className="watchLand">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/aws">
            <Route element={<AwsAuth />}>
              <Route index element={<AwsAccounts />}></Route>
              <Route path="groups" element={<AwsGroupsPage />}></Route>
              <Route path="streams" element={<AwsStreamsPage />}></Route>
              <Route path="logs" element={<AwsLogsPage />}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/azure" element={<Azure />}></Route>
          <Route path="/google" element={<GoogleCloud />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default WatchLand;
