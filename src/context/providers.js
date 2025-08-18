import { createContext, useContext } from "solid-js";

export const SearchBarContext = createContext();
export const useSearchBar = () => useContext(SearchBarContext);

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const EditMediaEntriesContext = createContext();
export const useEditMediaEntries = () => useContext(EditMediaEntriesContext);

export const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext);

export const ResponsiveContext = createContext();
export const useResponsive = () => useContext(ResponsiveContext);

export const UserMediaListContext = createContext();
export const useUserMediaList = () => useContext(UserMediaListContext);

export const CompareMediaListContext = createContext();
export const useCompareMediaList = () => useContext(CompareMediaListContext);

export const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);