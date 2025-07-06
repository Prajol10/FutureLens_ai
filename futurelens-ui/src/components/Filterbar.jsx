function FilterBar({ filterThreshold, setFilterThreshold, refreshData }) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="threshold" className="font-medium text-gray-700">Minimum Match:</label>
          <input
            type="range"
            id="threshold"
            min="0"
            max="100"
            value={filterThreshold}
            onChange={(e) => setFilterThreshold(e.target.value)}
            className="w-40"
          />
          <span className="text-indigo-600 font-semibold">{filterThreshold}%</span>
        </div>
  
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          🔄 Refresh Matches
        </button>
      </div>
    );
  }
  
  export default FilterBar;