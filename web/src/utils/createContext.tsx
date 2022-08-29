import React from 'react';

interface ProviderProps<T> extends React.PropsWithChildren {
  value: T;
}

export const createContext = <T,>(defaultValue: T) => {
  const Context = React.createContext(defaultValue);
  const useContext = () => React.useContext(Context);
  const Provider = ({ value, children }: ProviderProps<T>) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useContext, Context] as const;
};
