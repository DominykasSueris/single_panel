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
  const [sessions, setSessions] = useState<Session[]>(AuthSessions.getConnections());
  const [hasActiveConnections, setActiveConnections] = useState<boolean>(false);

  const addSession = (session: Session) => {
    AuthSessions.updateConnections(session);
    sessions.push(session);
    setActiveConnections(true);
  };

  const deleteSession = (tag: string) => {
    const remainingConnections = sessions.filter(session => session.tag !== tag);
    AuthSessions.deleteConnections(tag);
    setSessions(remainingConnections);
    if (remainingConnections.length === 0) setActiveConnections(false);
  };

  const syncClients = async () => {
    const connections = AuthSessions.getConnections();
    for (const connection of connections) {
      await configClient(connection.key, connection.secret, connection.authRegion);
      setActiveConnections(true);
    }
  };

  useEffect(() => {
    syncClients();
  }, []);

  return (
    <AuthContext.Provider
      value={{ sessions: sessions, addSession: addSession, deleteSession: deleteSession }}
    >
      {hasActiveConnections ? <Outlet></Outlet> : <Login />}
    </AuthContext.Provider>
  );
};

export default AwsAuth;
