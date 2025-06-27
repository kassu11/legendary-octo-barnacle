import useMediaQuery from "../hooks/useMediaQuery";
import { ResponsiveContext } from "./providers";

export function ResponsiveProvider(props) {
  const isMobilSmall = useMediaQuery("(max-width: 30em)");
  const isMobilLarge = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");
  const isLaptop = useMediaQuery("(max-width: 80em)");
  const isDesktop = useMediaQuery("(max-width: 90em)");
  const isDesktopLarge = useMediaQuery("(max-width: 160em)");
  
  const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)"); 
  const isPWA = useMediaQuery("(display-mode: standalone)");

  return (
    <ResponsiveContext.Provider value={{ isMobilSmall, isMobilLarge, isTablet, isLaptop, isDesktop, isDesktopLarge, isTouch, isPWA }}>
      {props.children}
    </ResponsiveContext.Provider>
  );
}

