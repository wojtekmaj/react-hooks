import {
  useEventListener,
  useMatchMedia,
  useMutationObserver,
  useSetInterval,
  useSetTimeout,
  useTick,
  useToggle,
} from './index';

describe('index', () => {
  it('has useEventListener exported properly', () => {
    expect(useEventListener).toBeInstanceOf(Function);
  });

  it('has useMatchMedia exported properly', () => {
    expect(useMatchMedia).toBeInstanceOf(Function);
  });

  it('has useMutationObserver exported properly', () => {
    expect(useMutationObserver).toBeInstanceOf(Function);
  });

  it('has useSetInterval exported properly', () => {
    expect(useSetInterval).toBeInstanceOf(Function);
  });

  it('has useSetTimeout exported properly', () => {
    expect(useSetTimeout).toBeInstanceOf(Function);
  });

  it('has useTick exported properly', () => {
    expect(useTick).toBeInstanceOf(Function);
  });

  it('has useToggle exported properly', () => {
    expect(useToggle).toBeInstanceOf(Function);
  });
});
