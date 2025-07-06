function SearchSortBar({ searchQuery, setSearchQuery, sortOption, setSortOption }) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
  
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="score">Sort by Match Score</option>
          <option value="title">Sort by Job Title</option>
        </select>
      </div>
    );
  }
  
  export default SearchSortBar;