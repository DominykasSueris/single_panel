import { LoginConfig } from "components/Auth/Login";

export class AuthSessions {
  static session_methods_key = "auth_methods";

  static getMethods(): LoginConfig[] {
    const sessionMethods = window.sessionStorage.getItem(this.session_methods_key);
    if (!sessionMethods) return [];
    const methods = [...JSON.parse(sessionMethods)];
    return methods;
  }

  static setMethods(methods: LoginConfig[]) {
    const sessionStorage = window.sessionStorage;
    const methodsString = JSON.stringify(methods);
    sessionStorage.setItem(this.session_methods_key, methodsString);
  }

  static updateMethods(method: LoginConfig) {
    const sessionMethods = this.getMethods();
    sessionMethods.push(method);
    this.setMethods(sessionMethods);
  }
}
