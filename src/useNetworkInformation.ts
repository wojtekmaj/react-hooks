import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export default function useNetworkInformation(): NetworkInformation | null {
  const [connection, setConnection] = useState<NetworkInformation | null>(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return null;
    }

    const connection = navigator.connection;

    return connection || null;
  });

  useEffect(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return;
    }

    const connection = navigator.connection;

    if (!connection) {
      return;
    }

    function onConnectionChange() {
      if (!isBrowser || !('connection' in navigator)) {
        return null;
      }

      const connection = navigator.connection;

      setConnection(connection || null);
    }

    connection.addEventListener('change', onConnectionChange);

    return () => {
      connection.removeEventListener('change', onConnectionChange);
    };
  }, []);

  return connection;
}
