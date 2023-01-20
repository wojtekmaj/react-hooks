import { renderHook, act } from '@testing-library/react-hooks';

import usePermissionState from './usePermissionState';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('usePermissionState()', () => {
  let state: PermissionState;
  let query: jest.Mock<typeof navigator.permissions.query>;
  let addEventListener: jest.Mock<typeof window.Notification.prototype.addEventListener>;
  let removeEventListener: jest.Mock<typeof window.Notification.prototype.removeEventListener>;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      state = 'granted';
      query = jest.fn();
      addEventListener = jest.fn();
      removeEventListener = jest.fn();

      Object.defineProperty(navigator, 'permissions', {
        configurable: true,
        enumerable: true,
        get: () => ({
          query,
        }),
      });

      const mockQuery = jest.spyOn(navigator.permissions, 'query');

      (mockQuery as jest.SpyInstance<Promise<Partial<PermissionStatus>>>).mockImplementation(
        async () => ({
          get state() {
            return state;
          },
          addEventListener,
          removeEventListener,
        }),
      );

      Object.defineProperty(window, 'Notification', {
        configurable: true,
        enumerable: true,
        get: () => ({
          get permission() {
            return state;
          },
        }),
      });
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
    let listener: EventListener;
    addEventListener.mockImplementationOnce((type, currentListener) => {
      listener = currentListener;

      return () => null;
    });

    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    act(() => {
      state = 'denied';
      const event = new Event('change');
      listener(event);
    });

    expect(result.current).toBe('denied');
  });
});