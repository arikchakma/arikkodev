import { useCallback, useEffect, useState } from 'react';

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return useCallback(() => isMounted, [isMounted]);
}

export default useIsMounted;
