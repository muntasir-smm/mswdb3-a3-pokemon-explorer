// src/components/SearchBar.jsx

<div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search Pokémon..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>;
