import useScrollLeft from './useScrollLeft.js';
import useWindowWidth from './useWindowWidth.js';

export default function useScrollLeftPercent(): number | null {
  const scrollLeft = useScrollLeft();
  const windowWidth = useWindowWidth();

  if (scrollLeft === null || windowWidth === null) {
    return null;
  }

  const { scrollWidth } = document.documentElement;

  if (scrollWidth === 0 || scrollWidth === windowWidth) {
    return 0;
  }

  return scrollLeft / Math.max(0, scrollWidth - windowWidth);
}
