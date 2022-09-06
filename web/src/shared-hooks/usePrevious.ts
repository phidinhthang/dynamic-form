import React from 'react';

export const usePrevious = <T>(
  value: T
): React.MutableRefObject<T | undefined> => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};
