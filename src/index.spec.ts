import { describe, expect, it } from 'vitest';
import {
  useCurrentPosition,
  useEventListener,
  useIntersectionObserver,
  useLocalStorage,
  useMatchMedia,
  useMutationObserver,
  useOnLine,
  usePermissionState,
  usePrefersColorSchemeDark,
  usePrefersColorSchemeLight,
  usePrefersReducedMotion,
  usePrefersReducedTransparency,
  useResizeObserver,
  useScrollLeft,
  useScrollTop,
  useSetInterval,
  useSetTimeout,
  useTick,
  useToggle,
  useWindowHeight,
  useWindowWidth,
} from './index';

describe('index', () => {
  it('has useCurrentPosition exported properly', () => {
    expect(useCurrentPosition).toBeInstanceOf(Function);
  });

  it('has useEventListener exported properly', () => {
    expect(useEventListener).toBeInstanceOf(Function);
  });

  it('has useMatchMedia exported properly', () => {
    expect(useMatchMedia).toBeInstanceOf(Function);
  });

  it('has useIntersectionObserver exported properly', () => {
    expect(useIntersectionObserver).toBeInstanceOf(Function);
  });

  it('has useLocalStorage exported properly', () => {
    expect(useLocalStorage).toBeInstanceOf(Function);
  });

  it('has useMutationObserver exported properly', () => {
    expect(useMutationObserver).toBeInstanceOf(Function);
  });

  it('has useOnLine exported properly', () => {
    expect(useOnLine).toBeInstanceOf(Function);
  });

  it('has usePermissionState exported properly', () => {
    expect(usePermissionState).toBeInstanceOf(Function);
  });

  it('has usePrefersColorSchemeDark exported properly', () => {
    expect(usePrefersColorSchemeDark).toBeInstanceOf(Function);
  });

  it('has usePrefersColorSchemeLight exported properly', () => {
    expect(usePrefersColorSchemeLight).toBeInstanceOf(Function);
  });

  it('has usePrefersReducedMotion exported properly', () => {
    expect(usePrefersReducedMotion).toBeInstanceOf(Function);
  });

  it('has usePrefersReducedTransparency exported properly', () => {
    expect(usePrefersReducedTransparency).toBeInstanceOf(Function);
  });

  it('has useResizeObserver exported properly', () => {
    expect(useResizeObserver).toBeInstanceOf(Function);
  });

  it('has useScrollLeft exported properly', () => {
    expect(useScrollLeft).toBeInstanceOf(Function);
  });

  it('has useScrollTop exported properly', () => {
    expect(useScrollTop).toBeInstanceOf(Function);
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

  it('has useWindowHeight exported properly', () => {
    expect(useWindowHeight).toBeInstanceOf(Function);
  });

  it('has useWindowWidth exported properly', () => {
    expect(useWindowWidth).toBeInstanceOf(Function);
  });
});
