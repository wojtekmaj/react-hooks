import useScrollLeft from './useScrollLeft';

export default function useScrollLeftPercent(): number | null {
  const scrollLeft = useScrollLeft();

  if (scrollLeft === null) {
    return null;
  }

  const { scrollHeight } = document.documentElement;

  if (scrollHeight === 0) {
    return 0;
  }

  return scrollLeft / Math.max(0, scrollHeight - window.innerHeight);
}
