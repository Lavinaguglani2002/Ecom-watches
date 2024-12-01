// import { useState, useContext, createContext } from "react";

// const SearchContext = createContext();
  
// const SearchProvider = ({ children }) => {
//   const [searchState, setSearchState] = useState({
//     keyword: "",
//     results: [],
//   });

//   return (
//     <SearchContext.Provider value={[searchState, setSearchState]}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // Custom hook
// const useSearch = () => useContext(SearchContext);

// export { useSearch, SearchProvider };
import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };