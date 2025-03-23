import { createContext, useContext } from "solid-js";
import useMediaQuery from "../hooks/useMediaQuery";

const ResponsiveContext = createContext();

export function ResponsiveProvider(props) {
  const isMobilSmall = useMediaQuery("(max-width: 30em)");
  const isMobilLarge = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");
  const isLaptop = useMediaQuery("(max-width: 80em)");
  const isDesktop = useMediaQuery("(max-width: 90em)");
  const isDesktopLarge = useMediaQuery("(max-width: 160em)");
  
  const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)"); 

  return (
    <ResponsiveContext.Provider value={{ isMobilSmall, isMobilLarge, isTablet, isLaptop, isDesktop, isDesktopLarge, isTouch }}>
      {props.children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
} 
