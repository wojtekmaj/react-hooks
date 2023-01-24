import useScrollLeft from './useScrollLeft';

export default function useScrollLeftPercent(): number | null {
  const scrollLeft = useScrollLeft();

  if (scrollLeft === null) {
    return null;
  }

  const { scrollWidth } = document.documentElement;

  if (scrollWidth === 0) {
    return 0;
  }

  return scrollLeft / Math.max(0, scrollWidth - window.innerWidth);
}
