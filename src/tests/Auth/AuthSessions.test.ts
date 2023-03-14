import { AuthSessions } from "services/AuthSessions";
import { AuthRegion, AuthTarget } from "redux/specs/authSpecs";
import { LoginConfig, WLDevProfiles } from "components/Auth/Login";

beforeEach(() => {
  window.sessionStorage.clear();
});

test("test if getmethods returns empty array, when session is empty", () => {
  expect(AuthSessions.getMethods()).toStrictEqual([]);
});
test("test if getMethod are parsed to string", () => {
  window.sessionStorage.setItem("auth_methods", '[{"master_key": "cat"}]');
  expect(AuthSessions.getMethods()).toStrictEqual([{ master_key: "cat" }]);
});
test("test if getMethod are parsed to string if more than one value", () => {
  window.sessionStorage.setItem(
    "auth_methods",
    '[{"master_key": "cat", "late_convenience": "dog" }]'
  );
  expect(AuthSessions.getMethods()).toStrictEqual([{ master_key: "cat", late_convenience: "dog" }]);
});
test("test if setMethods updates sessionStorage ", () => {
  const method: LoginConfig = {
    type: WLDevProfiles.PROGRAMMATIC,
    target: AuthTarget.aws,
    region: AuthRegion["eu-central-1"],
    key: "asd",
    secret: "secret"
  };
  AuthSessions.setMethods([method]);
  const item = window.sessionStorage.getItem("auth_methods");
  const expectedResults = JSON.stringify([method]);

  expect(item).toStrictEqual(expectedResults);
});
test("test if updateMethods updates sessionStorage", () => {
  const method1: LoginConfig = {
    type: WLDevProfiles.PROGRAMMATIC,
    target: AuthTarget.aws,
    region: AuthRegion["eu-west-1"],
    key: "asd",
    secret: "secret"
  };
  const method2: LoginConfig = {
    type: WLDevProfiles.PROGRAMMATIC,
    target: AuthTarget.aws,
    region: AuthRegion["eu-west-3"],
    key: "asd",
    secret: "secret"
  };
  AuthSessions.setMethods([method1]);
  AuthSessions.updateMethods(method2);
  expect(window.sessionStorage.getItem("auth_methods")).toStrictEqual(
    JSON.stringify([method1, method2])
  );
});
