// src/components/SearchBar.jsx

import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
