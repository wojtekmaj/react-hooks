import { useEffect, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

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

export default function useNetworkInformation() {
  const [connection, setConnection] = useState<NetworkInformation | null>(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return null;
    }

    const connection = navigator.connection as NetworkInformation;

    return connection;
  });

  useEffect(() => {
    if (!isBrowser || !('connection' in navigator)) {
      return;
    }

    const connection = navigator.connection as NetworkInformation;

    function onConnectionChange() {
      if (!isBrowser || !('connection' in navigator)) {
        return null;
      }

      const connection = navigator.connection as NetworkInformation;

      setConnection(connection);
    }

    connection.addEventListener('change', onConnectionChange);

    return () => {
      connection.removeEventListener('change', onConnectionChange);
    };
  }, []);

  return connection;
}
