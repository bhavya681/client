import React, { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = (props) => {
  const [values, setValues] = useState({ keyword: "", results: [] });
  const [results, setResults] = useState([]);
  return (
    <>
      <SearchContext.Provider
        value={{ results, values, setResults, setValues }}
      >
        {props.children}
      </SearchContext.Provider>
    </>
  );
};

export default SearchProvider;
