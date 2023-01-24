import useScrollTop from './useScrollTop';

export default function useScrollTopPercent(): number | null {
  const scrollTop = useScrollTop();

  if (scrollTop === null) {
    return null;
  }

  const { scrollHeight } = document.documentElement;

  if (scrollHeight === 0) {
    return 0;
  }

  return scrollTop / Math.max(0, scrollHeight - window.innerHeight);
}
