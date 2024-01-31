// SearchBar.js
import React, { useState } from 'react';
import { debounce } from 'lodash';
// import { debounce } from 'cypress/types/lodash';

interface EventData {
  title: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = debounce(async (searchQuery: string) => {
    const apiSearch = `http://localhost:9296/api/event/?q=${searchQuery}`;
    // Lakukan operasi pencarian di sini
    try {
      const res = await fetch(apiSearch);
      const { data }: { data: EventData[] } = await res.json();

      const titles = data.map((item) => item.title);

      setSearchResults(titles);
      console.log('Searching for:', query);
      console.log(searchResults);
    } catch (error) {}
  }, 1000); // Nilai debounce disesuaikan dengan kebutuhan Anda

  const handleChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded p-2"
        value={query}
        onChange={handleChange}
      />
      <div className="relative">
        {searchResults.map((result, id) => (
          <div key={id} className="bg-[red] absolute z-10 w-auto h-auto px-11">
            {result}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
