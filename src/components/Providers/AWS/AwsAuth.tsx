import { useEffect, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { configClient } from "services/aws/aws";
import Login, { Session } from "components/Auth/Login";
import { AuthSessions } from "services/AuthSessions";

interface AuthContextProperties {
  sessions: Session[];
  addSession: (session: Session) => void;
  deleteSession: (tag: string) => void;
}

export const AuthContext = createContext<AuthContextProperties>({} as AuthContextProperties);

const AwsAuth = () => {
  const [sessions, setSessions] = useState<Session[]>(AuthSessions.getMethods());

  const addSession = (session: Session) => {
    AuthSessions.updateMethods(session);
    sessions.push(session);
  };

  const deleteSession = (tag: string) => {
    const remainingConnections = sessions.filter(session => session.tag !== tag);
    AuthSessions.deleteMethods(tag);
    setSessions(remainingConnections);
  };

  const syncClients = async () => {
    const methods = AuthSessions.getMethods();
    for (const method of methods) {
      await configClient(method.key, method.secret, method.authTarget);
    }
  };

  useEffect(() => {
    syncClients();
  }, []);

  return (
    <AuthContext.Provider
      value={{ sessions: sessions, addSession: addSession, deleteSession: deleteSession }}
    >
      {sessions ? <Outlet></Outlet> : <Login />}
    </AuthContext.Provider>
  );
};

export default AwsAuth;
