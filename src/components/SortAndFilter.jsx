// src/components/SortAndFilter.jsx

import React from "react";

const SortAndFilter = ({
  sortOption,
  setSortOption,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="mb-3 d-flex gap-3 justify-content-end ">
      <div className="d-flex flex-row align-items-center  justify-content-between">
        <h5 className="px-3 text-nowrap">Sort by:</h5>
        <select
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="stats">Base Stats</option>
        </select>
      </div>
      <div className="d-flex flex-row align-items-center  justify-content-between ">
        <h5 className="px-3 text-nowrap">Filter Type:</h5>
        <select
          className="form-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
        </select>
      </div>
    </div>
  );
};

export default SortAndFilter;
