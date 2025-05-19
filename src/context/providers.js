import { createContext, useContext } from "solid-js";

export const SearchBarContext = createContext();
export const useSearchBar = () => useContext(SearchBarContext);
