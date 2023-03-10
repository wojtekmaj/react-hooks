import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

type NetworkInformation = {
  addEventListener: (event: string, callback: () => void) => void;
  downlink: number;
  downlinkMax?: number;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  removeEventListener: (event: string, callback: () => void) => void;
  rtt: number;
  saveData: boolean;
  type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
};

type NavigatorWithConnection = Navigator & { connection: NetworkInformation };

export default function useNetworkInformation(): NetworkInformation | null {
  const [connection, setConnection] = useState<NetworkInformation | null>(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return null;
    }

    const connection = (navigator as NavigatorWithConnection).connection;

    return connection;
  });

  useEffect(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return;
    }

    const connection = (navigator as NavigatorWithConnection).connection;

    function onConnectionChange() {
      if (!isBrowser || !('connection' in navigator)) {
        return null;
      }

      const connection = (navigator as NavigatorWithConnection).connection;

      setConnection(connection);
    }

    connection.addEventListener('change', onConnectionChange);

    return () => {
      connection.removeEventListener('change', onConnectionChange);
    };
  }, []);

  return connection;
}
