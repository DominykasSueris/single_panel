import { Session } from "components/Auth/Login";
import { CloudWatch } from "./aws/aws";

export class AuthSessions {
  static session_methods_key = "auth_methods";

  static getMethods(): Session[] {
    const sessionMethods = window.sessionStorage.getItem(this.session_methods_key);
    if (!sessionMethods) return [];
    const methods = [...JSON.parse(sessionMethods)];
    return methods;
  }

  static setMethods(methods: Session[]) {
    const sessionStorage = window.sessionStorage;
    const methodsString = JSON.stringify(methods);
    sessionStorage.setItem(this.session_methods_key, methodsString);
  }

  static updateMethods(method: Session) {
    const sessionMethods = this.getMethods();
    sessionMethods.push(method);
    this.setMethods(sessionMethods);
  }

  static deleteMethods(tag: string) {
    const existingMethods = AuthSessions.getMethods();
    const remainingConnections = existingMethods.filter(
      existingMethod => existingMethod.tag !== tag
    );
    CloudWatch.removeWatcher(tag);
    AuthSessions.setMethods(remainingConnections);
  }
}
