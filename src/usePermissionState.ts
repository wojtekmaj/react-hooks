import { useEffect, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns permission state given permission name.
 *
 * @param {PermissionDescriptor} options Options
 * @param {PermissionDescriptor.name} options.name Permission name
 * @returns {string | null} Permission state ("granted", "denied", "prompt")
 */
export default function usePermissionState({ name }: PermissionDescriptor): PermissionState | null {
  const [state, setState] = useState<PermissionState | null>(() => {
    const areNavigatorPermissionsSupported = isBrowser && 'permissions' in navigator;

    if (!areNavigatorPermissionsSupported) {
      return null;
    }

    if (name === 'notifications') {
      const potentialState = Notification.permission;

      return potentialState === 'default' ? 'prompt' : potentialState;
    }

    return null;
  });

  useEffect(() => {
    const areNavigatorPermissionsSupported = isBrowser && 'permissions' in navigator;

    if (!areNavigatorPermissionsSupported) {
      return;
    }

    let permissionStatus: PermissionStatus;

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
  }, [name]);

  return state;
}
