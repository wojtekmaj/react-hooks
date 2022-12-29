import { renderHook, act } from '@testing-library/react-hooks';

import usePermissionState from './usePermissionState';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

function waitForAsync() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('usePermissionState()', () => {
  let state;
  let query;
  let addEventListener;
  let removeEventListener;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      state = 'granted';
      query = jest.fn();
      addEventListener = jest.fn();
      removeEventListener = jest.fn();

      const permissionStatus = {
        get state() {
          return state;
        },
        addEventListener,
        removeEventListener,
      };

      query.mockImplementation(async () => permissionStatus);

      window.Notification = {
        get permission() {
          return state;
        },
      };

      window.navigator.permissions = {};
      window.navigator.permissions.query = query;
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  itIfDocumentDefined('should return null initially', async () => {
    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe(null);

    await act(() => waitForAsync());
  });

  itIfDocumentDefined(
    'should return Notification.permission initially given name "notifications"',
    async () => {
      const { result } = renderHook(() => usePermissionState({ name: 'notifications' }));

      expect(result.current).toBe('granted');

      await act(() => waitForAsync());
    },
  );

  itIfDocumentUndefined('should return null', async () => {
    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe(null);

    await act(() => waitForAsync());
  });

  itIfDocumentDefined('should query permissions', async () => {
    renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    expect(query).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should add listener', async () => {
    renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should update the flag when the listener is called', async () => {
    let listener;
    addEventListener.mockImplementationOnce((type, currentListener) => {
      listener = currentListener;
    });

    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    act(() => {
      state = 'denied';
      listener();
    });

    expect(result.current).toBe('denied');
  });
});
