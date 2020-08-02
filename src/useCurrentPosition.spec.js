import { renderHook, act } from '@testing-library/react-hooks';

import useCurrentPosition from './useCurrentPosition';

describe('useCurrentPosition()', () => {
  let getCurrentPosition;
  let watchPosition;

  beforeEach(() => {
    getCurrentPosition = jest.fn();
    watchPosition = jest.fn();

    const geolocation = {
      getCurrentPosition,
      watchPosition,
      clearWatch: () => {},
    };

    window.navigator.geolocation = geolocation;
  });

  it('should return null initially', () => {
    const { result } = renderHook(() => useCurrentPosition());

    expect(result.current).toBe(null);
  });

  it('should get initial position', () => {
    renderHook(() => useCurrentPosition());

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it('should subscribe to position changes', () => {
    renderHook(() => useCurrentPosition());

    expect(watchPosition).toHaveBeenCalledTimes(1);
  });

  it('should update the flag when getCurrentPosition listener is called', () => {
    let listener;
    getCurrentPosition.mockImplementationOnce((currentListener) => { listener = currentListener; });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({ coords: { lat: 0, lng: 0 } });
    });

    expect(result.current).toEqual({ lat: 0, lng: 0 });
  });

  it('should update the flag when watchPosition listener is called', () => {
    let listener;
    watchPosition.mockImplementationOnce((currentListener) => { listener = currentListener; });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({ coords: { lat: 0, lng: 0 } });
    });

    expect(result.current).toEqual({ lat: 0, lng: 0 });
  });
});
