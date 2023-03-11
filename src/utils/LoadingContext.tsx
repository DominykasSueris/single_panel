import React, { useContext, useState } from "react";

interface LoadingContext {
  loading: boolean | undefined;
  setLoading?: () => void;
}

interface LoadingProps {
  children: React.ReactNode;
}

const defaultState = {
  loading: false
};

const LoadingContext = React.createContext<LoadingContext>(defaultState);

export const LoadingProvider: React.FC<LoadingProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>();

  return (
    <LoadingContext.Provider
      value={{
        loading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
