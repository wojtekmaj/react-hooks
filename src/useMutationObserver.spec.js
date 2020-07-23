import { renderHook } from '@testing-library/react-hooks';

import useMutationObserver from './useMutationObserver';

describe('useMutationObserver()', () => {
  const config = {
    childList: true,
    subtree: true,
  };

  it('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    renderHook(() => useMutationObserver(element, config, listener));

    element.appendChild(document.createElement('span'));

    await new Promise((resolve) => resolve());

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(
      [expect.any(MutationRecord)],
      expect.any(MutationObserver),
    );
  });
});
