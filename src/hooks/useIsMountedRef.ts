import { useEffect, useRef } from 'react';

const useIsMountedRef = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};
export default useIsMountedRef;
