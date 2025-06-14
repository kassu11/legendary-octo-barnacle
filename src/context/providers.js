import { createContext, useContext } from "solid-js";

export const SearchBarContext = createContext();
export const useSearchBar = () => useContext(SearchBarContext);

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const EditMediaEntriesContext = createContext();
export const useEditMediaEntries = () => useContext(EditMediaEntriesContext);

export const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext);
