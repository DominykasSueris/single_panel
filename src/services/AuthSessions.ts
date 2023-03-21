import { Session } from "components/Auth/Login";
import { CloudWatch } from "./aws/aws";

export class AuthSessions {
  static session_connections_key = "auth_methods";

  static getConnections(): Session[] {
    const sessionConnections = window.sessionStorage.getItem(this.session_connections_key);
    if (!sessionConnections) return [];
    const connections = [...JSON.parse(sessionConnections)];
    return connections;
  }

  static setConnections(connections: Session[]) {
    const sessionStorage = window.sessionStorage;
    const connectionsString = JSON.stringify(connections);
    sessionStorage.setItem(this.session_connections_key, connectionsString);
  }

  static updateConnections(connection: Session) {
    const sessionConnections = this.getConnections();
    sessionConnections.push(connection);
    this.setConnections(sessionConnections);
  }

  static deleteConnections(tag: string) {
    const existingConnections = AuthSessions.getConnections();
    const remainingConnections = existingConnections.filter(
      existingConnection => existingConnection.tag !== tag
    );
    CloudWatch.removeWatcher(tag);
    AuthSessions.setConnections(remainingConnections);
  }
}
