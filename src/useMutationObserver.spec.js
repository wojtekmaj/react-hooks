import { renderHook } from '@testing-library/react-hooks';

import useMutationObserver from './useMutationObserver';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useMutationObserver()', () => {
  const config = {
    childList: true,
    subtree: true,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const listener = () => {};

    const { result } = renderHook(() => useMutationObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    renderHook(() => useMutationObserver(element, config, listener));

    element.appendChild(document.createElement('span'));

    await waitForAsync();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(
      [expect.any(MutationRecord)],
      expect.any(MutationObserver),
    );
  });
});
