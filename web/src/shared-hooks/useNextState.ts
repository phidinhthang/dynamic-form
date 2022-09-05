import React from 'react';

export const useNextState = <S>(state: S) => {
  const stateRef = React.useRef(state);
  const resolvesRef = React.useRef<Array<(s: S) => void>>([]);
  React.useEffect(() => {
    for (const resolve of resolvesRef.current) {
      resolve(state);
    }
    stateRef.current = state;
  }, [state]);

  return () => new Promise<S>((res) => resolvesRef.current.push(res));
};
