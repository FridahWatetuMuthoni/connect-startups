import React from "react";
import SearchFormReset from "./SearchFormReset";

async function Search({ query }: { query: string | undefined | string[] }) {
  console.log(query);
  return (
    <form action="/" className="search-form flex rounded-md w-full">
      <input
        type="text"
        name="query"
        className="w-full p-3 rounded-md rounded-r-none border  border-gray-300 placeholder-current  "
        placeholder="Search..."
      />
      <SearchFormReset />
    </form>
  );
}

export default Search;
