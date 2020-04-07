import { useLayoutEffect, useState } from "react";

export const SCREEN_SIZES = {
  xl: { id: "xl", mediaQuery: "(min-width: 1200px)" },
  lg: { id: "lg", mediaQuery: "(max-width: 1200px) and (min-width: 960px)" },
  md: { id: "md", mediaQuery: "(max-width: 950px) and (min-width: 720px)" },
  sm: { id: "sm", mediaQuery: "(max-width: 720px) and (min-width: 540px)" },
  xs: { id: "xs", mediaQuery: "(max-width: 540px)" }
};

export const SUPPORTED_COLUMNS_NUMS = [1, 2, 3, 4, 6, 12];

export const DEFAULT_COLUMNS_NUM = 3;

export const TOTAL_NUMBER_OF_LAYOUT_COLUMNS = 12;

export function screenSizeToColumns(screenSize: string) {
  switch (screenSize) {
    case SCREEN_SIZES.xs.id:
      return 1;

    case SCREEN_SIZES.sm.id:
    case SCREEN_SIZES.md.id:
      return 3;

    case SCREEN_SIZES.lg.id:
    case SCREEN_SIZES.xl.id:
      return 4;

    default:
      return DEFAULT_COLUMNS_NUM;
  }
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerHeight, window.innerWidth]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
