// SearchBar.js
import React, { useState } from 'react';
import { debounce } from 'lodash';
// import { debounce } from 'cypress/types/lodash';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = debounce(() => {
    // Lakukan operasi pencarian di sini
    console.log('Searching for:', query);
  }, 500); // Nilai debounce disesuaikan dengan kebutuhan Anda

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch();
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="border rounded p-2"
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
