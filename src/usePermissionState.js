import { useEffect, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns permission state given permission name.
 *
 * @param {object} options Options
 * @param {string} options.name Permission name
 * @returns {string} Permission state ("granted", "denied", "prompt")
 */
export default function usePermissionState({ name }) {
  const areNavigatorPermissionsSupported = isBrowser && 'permissions' in navigator;

  const [state, setState] = useState(() => {
    if (!areNavigatorPermissionsSupported) {
      return null;
    }

    if (name === 'notifications' && 'Notification' in window) {
      const potentialState = Notification.permission;

      return potentialState === 'default' ? 'prompt' : potentialState;
    }

    return null;
  });

  useEffect(() => {
    if (!areNavigatorPermissionsSupported) {
      return;
    }

    let permissionStatus;

    function onPermissionStatusChange() {
      setState(permissionStatus.state);
    }

    navigator.permissions.query({ name }).then((result) => {
      permissionStatus = result;

      setState(permissionStatus.state);

      permissionStatus.addEventListener('change', onPermissionStatusChange);
    });

    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener('change', onPermissionStatusChange);
      }
    };
  }, [areNavigatorPermissionsSupported, name]);

  return state;
}
