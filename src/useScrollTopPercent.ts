import useScrollTop from './useScrollTop';
import useWindowHeight from './useWindowHeight';

export default function useScrollTopPercent(): number | null {
  const scrollTop = useScrollTop();
  const windowHeight = useWindowHeight();

  if (scrollTop === null || windowHeight === null) {
    return null;
  }

  const { scrollHeight } = document.documentElement;

  if (scrollHeight === 0) {
    return 0;
  }

  return scrollTop / Math.max(0, scrollHeight - windowHeight);
}
